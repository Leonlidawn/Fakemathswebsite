前言：
这个项目是根据okta教程魔改出来的。目的熟悉一下vue.js和digital ocean部署. 当时对很多地方还是一知半解，写得恨不规范。有机会可以用react从新捋一遍。


请先参考https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node做一次

魔改版的大部分text都存在数据库里了，可以把数据库也下载了。

okta教程原版server.js只管数据库，魔改版的server.js 除了数据库也serve build后的 静态文件（build将vue的文件处理成静态文件）。

开发与production用的server是不一样的。 server.js就是production用的，
本地玩的话按照okta教程npm run dev就可以了，有webpack自带的hot loading的。
但本地想开production可以用命令行node server.js 开启，不一定用pm2。

喜欢的话可以用这个魔改版本自己尝试一下部署，或者自己手动魔改okta原版的。

用"todo:"标明的是尚未解答的问题， 感觉可改进的地方 还有一些需要代码里需要个人手动修改的地方



==============
to connect digital ocean, we have to provide the ssh public key
this public key can be found by:

    cat ~/.ssh/id_rsa.pub
      
如果没有的话可以用：
      
    ssh-keygen -t rsa  
  //todo: -t 有什么用，有其他选项吗
      
      
then:
    
    ssh root@<server ip address>
 
after connected to the server, 
lsb_release -a //Todo:这是什么,应该是看系统版本，ls和ll有什么不同


如果需要docker,以下是docker官网的ubuntu版本docker下载安装代码
    
  sudo apt-get intall \
       apt-transport-https \
       ca-certificates \
       curl \
       software-properties-common
       
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  
  sudo apt-get update //Todo:apt-get又是什么
  sudo apt-get install docker-ce //Todo:docker-ce 又是什么


--建立git 文件，用于在server通过bitbuckei获取代码----
git init
git status //todo:用来干嘛

去bitbucket或者github建立repo,
然后copy repo的ssh代码， 在本地terminal：
git remote add origin git@bitbucket.org:Leonlidawn/<projectname>.git

git add . //准备文件
git commit -m '<说明>'
git push -u origin master   //Todo:需要确认一下git push格式，-u是什么

在bitbucket 的setting->access key 加入 本地和server的public key

----
同样道理，如果不需要docker的话，直接在server连接。
在server安装node js:
  
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - //todo: -sL,-E是什么
  sudo apt-get install -y nodejs //todo: -y是什么

获取或生成public key, 将其在bitbucket setting 加入到access key
在server terminal 用bitbucket ssh的git clone获取代码
获取完毕后再server terminal进入project主目录，运行npm install安装依赖来安装完毕后build 出dist文件夹：
      
       npm install --only-dev //不需要额外的东西，安装build所需的就好。
       npm install sqlite3@4.0.0 //如果sqlite dependency outdated，就运行这行
       npm run build
       node server.js --port 80

以来安装完毕后在project的server所在目录：
    
    npm i -g pm2
    
    pm2 startup //todo:这个应该是pm2设置服务器文件路径定位，用于意外crash后自动重启
        
    
    
    pm2 save
每次更改文件以后，在主目录
   
    pm2 stop server
    
    git pull
    git checkout
切换回server的目录，这是应为database的路径是相对路径，且以pm2的启动时的位置为起点
    pm2 list //用来看id的 
    pm2 restart server
    
上传文件到server，在本地terminal 直接用scp,例子:

    scp src/test root@<server ip>:/<文件路径>
    scp src/test.sqlite root@178.128.99.181:/root/themathsinstitute/src
    scp -i root@178.128.99.181:/root/themathsinstitute/dist.tar.gz ./
    
    scp src/test.sqlite root@167.99.68.177:/root/testing/themathsinstitute/src

    scp newFolder.tar.gz root@178.128.99.181:/root


----
关于okta的设置：
-application 的general settings下
  LOGIN的redirect URIs 需要设置：
   http://<host ip>/implicit/callback	   //没有服务器只有本地的话就是localhost的，我一般用http://localhost:8080/ http://localhost:8081/
                                         //注意本地用docker的话ip不一定是localhost, 某些docker版本在主机访问有可能是16开头的ip
   http://<A record eg. www.example.com>/implicit/callback   //如果有的话

-API的trusted origins加上
  http://<host ip>/

-client_id要与代码的auth信息一致

---
killing port in mac

lsof -n -i4TCP:<PORT>
killl -9 <PID>
