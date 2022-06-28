const http = require ('http'); // pacote para tratamento das requisições request e response dos protocolo http
const url = require ('url');   // pacote para tratamento e resolução da url, pastas, arquivo htpml será acessado
const fs = require ('fs');     // pacote para tratamento do sistema de arquivos, permitindo acesso aos arquivos para transmissão aos usuários
const path = require ('path'); // pacote para tratamento do caminho dos arquivos, extensões, etc.

// variaveis de ip e porta de comunicação do servidor localmente
const hostname = '127.0.0.1';
const port = 3000;

 // media type - definições sobre a natureza e formato dos arquivos
 const mimeTypes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  woff: "font/woof"
 };

 // metodo de criação do servidor com os parametros req - requisição e res - response que são ações do servidor para o cliente
 http.createServer((req,res) => {

  // variavel que recebe a informação do recursos acessado
  let acesso_uri = url.parse(req.url).pathname;
  
 //objeto process com todoas as informações do caminho completo do recurso
  let caminho_completo_recurso = path.join(process.cwd(), decodeURI(acesso_uri));
 
  // exibição do log com informações dos recursos completos
  console.log(caminho_completo_recurso);

  // tratamento de erro se tentar acessar algo no servidor que não existe
  let recurso_carregado;
  try{
    recursos_carregado = fs.listatSync(caminho_completo_recurso)
  } catch(error){
    res.writeHead(404, {'content-type': 'text/plain'});
    res.write('404: arquivo não encontrado!');
    res.end();
  }

  // verificação se o recursos é um arquivo ou não
if (recurso_carregado.isFile()){
  let mimeType = mimeTypes[path.extname(caminho_completo_recurso).substring(1)];

  res.writeHead(200, {'content-type': mimeType});
  let fluxo_arquivo = fs.createReadStream(caminho_completo_recursos);
  fluxo_arquivo.pipe(res);

} else if(recurso_carregado.isDirectory()){
  res.writeHead(302, {'Location': 'index.html'});
  res.end();
}else{
  res.writeHead(500, {'content-type': 'text/plain'});
  res.write("500: Erro interno do Servidor!");
  res.end();
}
  // servidor ficará escutando a aplicação
}).listen(port, hostname, () => {
      console.log(`server is running at https://${hostname}:${port}/`);
   });



