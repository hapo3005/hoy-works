const {defineConfig,devices}=require('@playwright/test');
module.exports=defineConfig({
  testDir:'./tests/e2e',
  timeout:30000,
  expect:{timeout:8000},
  fullyParallel:false,
  retries:1,
  reporter:'list',
  use:{baseURL:'http://127.0.0.1:4173',trace:'retain-on-failure'},
  webServer:{command:'python3 -m http.server 4173 --bind 127.0.0.1',url:'http://127.0.0.1:4173',reuseExistingServer:true,timeout:15000},
  projects:[
    {name:'desktop-chromium',use:{...devices['Desktop Chrome']}},
    {name:'mobile-chrome',use:{...devices['Pixel 7']}},
    {name:'mobile-webkit',use:{...devices['iPhone 15']}}
  ]
});
