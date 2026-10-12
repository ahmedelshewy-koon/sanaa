import {rm,mkdir,copyFile,cp} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','app.js']) await copyFile(file,`dist/${file}`);
await cp('public','dist/public',{recursive:true});
console.log('Built static site in dist/');
