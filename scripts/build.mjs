import {rm,mkdir,copyFile,cp} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','app.js','hr-demo.html','hr-demo.css','hr-demo.js','tasks-demo.html','tasks-demo.css','tasks-demo.js','crm-demo.html','crm-demo.css','crm-demo.js','erp-demo.html','erp-demo.css','erp-demo.js']) await copyFile(file,`dist/${file}`);
await cp('public','dist/public',{recursive:true});
console.log('Built static site in dist/');
