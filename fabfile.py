from fabric.operations import local
import time

githubUrl = 'https://github.com/jinius/noblog.git'
srcDir = 'fabric_src'
deployDir = 'fabric_deploy'
envFile = '~/local.env.js'

def stopForever():
	local('forever stopall')

def beforeSetup():
	stopForever()
	local('npm install -g bower grunt-cli forever')

def clone():
	local('rm -rf ~/%(src)s' %{'src': srcDir})
	local('cd; git clone %(url)s %(src)s; cd -' %{'url': githubUrl, 'src': srcDir})
	local('cp %(envFile)s ~/%(src)s/server/config/' %{'envFile': envFile, 'src': srcDir})

def update():
	local('cd %(src)s; git pull; cd -' %{'url': githubUrl, 'src': srcDir})

def afterClone():
	local('cd ~/%(src)s; npm install; bower install; cd -' %{'src': srcDir})

def build():
	local('cd ~/%(src)s; grunt build; cd -' %{'src': srcDir})
	local('rm -rf ~/%(dest)s' %{'dest': deployDir})
	local('mv ~/%(src)s/dist ~/%(dest)s' %{'src': srcDir, 'dest': deployDir})

def test():
	local('cd ~/%(src)s; grunt test' %{'src': srcDir})

def restartNode():
	stopForever()
	local('cd ~/%(dest)s/; npm install; bower install; cd -' %{'dest': deployDir})
	local('cd ~/%(dest)s; export NODE_ENV=production; forever start server/app.js; cd -' %{'dest': deployDir})

def restartNginx():
	local('sudo service nginx restart')

def setupDeploy():
	beforeSetup()
	clone()
	afterClone()
	build()
	restartNode()
	restartNginx()
	test()

def updateDeploy():
	update()
	build()
	restartNode()
	restartNginx()
	test()

