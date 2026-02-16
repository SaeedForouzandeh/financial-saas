const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// تابع برای لاگ کردن
function log(message) {
  console.log(`[Electron] ${message}`);
}

// تابع برای چک کردن وجود فایل
function checkFileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

function createWindow() {
  log('Creating main window...');

  // تنظیمات پنجره - اصلاح شده برای امنیت بهتر و لود فایل‌ها
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false, // غیرفعال برای امنیت
      contextIsolation: true, // فعال برای امنیت
      webSecurity: false, // برای توسعه موقت
      allowRunningInsecureContent: true,
      preload: path.join(__dirname, 'preload.js') // فایل preload
    },
    frame: false,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#111827',
    show: false
  });

  // مسیرهای مختلف برای تست
  const devUrl = 'http://localhost:3000';
  const prodPath1 = path.join(__dirname, '../dist/index.html');
  const prodPath2 = path.join(__dirname, '../../frontend/dist/index.html');
  const prodPath3 = 'G:\\financial-saas\\packages\\frontend\\dist\\index.html';

  log('Checking paths...');
  log(`Dev URL: ${devUrl}`);
  log(`Prod Path 1: ${prodPath1} - Exists: ${checkFileExists(prodPath1)}`);
  log(`Prod Path 2: ${prodPath2} - Exists: ${checkFileExists(prodPath2)}`);
  log(`Prod Path 3: ${prodPath3} - Exists: ${checkFileExists(prodPath3)}`);

  // تصمیم‌گیری برای لود
  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    log('Running in development mode - trying to connect to dev server...');
    
    win.loadURL(devUrl).catch((err) => {
      log(`Failed to connect to dev server: ${err.message}`);
      log('Falling back to production files...');
      loadFromFile(win, [prodPath1, prodPath2, prodPath3]);
    });
  } else {
    log('Running in production mode - loading from file...');
    loadFromFile(win, [prodPath1, prodPath2, prodPath3]);
  }

  // وقتی صفحه آماده شد، نشون بده
  win.once('ready-to-show', () => {
    log('Window ready to show');
    win.show();
  });

  // وقتی صفحه لود شد
  win.webContents.on('did-finish-load', () => {
    log('Page finished loading');
  });

  // اگه خطایی رخ داد
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
    log(`Failed to load: ${errorCode} - ${errorDescription}`);
    if (isMainFrame) {
      log('Main frame failed to load, checking if it\'s a file not found error...');
      if (errorDescription.includes('ERR_FILE_NOT_FOUND')) {
        log('File not found error detected, trying alternative loading method...');
        
        // اگه خطای فایل پیدا نشد، فایل index.html رو با محتوای مستقیم بخون
        const indexPath = prodPath1;
        if (checkFileExists(indexPath)) {
          log(`Reading file directly: ${indexPath}`);
          const htmlContent = fs.readFileSync(indexPath, 'utf-8');
          
          // اصلاح مسیرهای assets
          const basePath = path.dirname(indexPath);
          const fixedHtml = htmlContent.replace(
            /src="\/assets\//g, 
            `src="file://${basePath.replace(/\\/g, '/')}/assets/`
          ).replace(
            /href="\/assets\//g,
            `href="file://${basePath.replace(/\\/g, '/')}/assets/`
          );
          
          win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(fixedHtml)}`);
        }
      }
    }
  });

  // باز کردن DevTools
  win.webContents.openDevTools();
}

// تابع کمکی برای لود از فایل
function loadFromFile(win, paths) {
  for (const filePath of paths) {
    if (checkFileExists(filePath)) {
      log(`Loading from file: ${filePath}`);
      win.loadFile(filePath);
      return;
    }
  }
  
  log('ERROR: No valid file found to load!');
  showErrorPage(win, paths);
}

// تابع برای نمایش صفحه خطا
function showErrorPage(win, paths) {
  win.loadURL(`data:text/html;charset=utf-8,
    <html>
      <head>
        <style>
          body { 
            background: #111827; 
            color: white; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            font-family: Arial; 
            text-align: center;
            margin: 0;
            padding: 20px;
          }
          .error-box {
            background: #1f2937;
            border-radius: 12px;
            padding: 30px;
            max-width: 600px;
            border: 1px solid #374151;
          }
          h1 { color: #ef4444; margin-bottom: 20px; }
          p { color: #9ca3af; line-height: 1.6; }
          code { 
            background: #111827; 
            padding: 8px 12px; 
            border-radius: 6px; 
            display: block;
            margin: 10px 0;
            color: #10b981;
            font-family: monospace;
            text-align: left;
            word-break: break-all;
          }
          .path-list {
            text-align: left;
            margin: 20px 0;
            padding: 10px;
            background: #111827;
            border-radius: 8px;
          }
          .path-item {
            font-family: monospace;
            padding: 5px;
            margin: 5px 0;
            background: #374151;
            border-radius: 4px;
            color: #10b981;
            font-size: 12px;
            word-break: break-all;
          }
        </style>
      </head>
      <body>
        <div class="error-box">
          <h1>❌ Error Loading Application</h1>
          <p>Could not find built files at the following locations:</p>
          <div class="path-list">
            ${paths.map(p => `<div class="path-item">${p}</div>`).join('')}
          </div>
          <p>Please try the following:</p>
          <code>cd G:\\financial-saas\\packages\\frontend</code>
          <code>npm run build</code>
          <code>npm run electron</code>
          <p style="margin-top: 20px; color: #ef4444;">
            If you're still having issues, check the DevTools console for more details.
          </p>
        </div>
      </body>
    </html>
  `);
}

// وقتی Electron آماده شد
app.whenReady().then(() => {
  log('Electron is ready');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// وقتی همه پنجره‌ها بسته شدن
app.on('window-all-closed', () => {
  log('All windows closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// اگه خطایی توی فرآیند اصلی رخ داد
process.on('uncaughtException', (error) => {
  log(`Uncaught Exception: ${error.message}`);
  console.error(error);
});