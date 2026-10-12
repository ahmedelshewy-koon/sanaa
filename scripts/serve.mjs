import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(process.argv[2] || '.');
const port=Number(process.env.PORT || 5173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.mp4':'video/mp4','.woff2':'font/woff2','.json':'application/json'};
http.createServer(async(req,res)=> {
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file=path.resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));
    if(file!==root&&!file.startsWith(root+path.sep)) {res.writeHead(403);res.end('Forbidden');return;}
    const content=await fs.readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(content);
  } catch {res.writeHead(404);res.end('Not found');}
}).listen(port,'0.0.0.0',()=>console.log(`Sanaa: http://localhost:${port}`));
