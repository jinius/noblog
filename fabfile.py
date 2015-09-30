from fabric.operations import local

githubUrl = 'https://github.com/jinius/noblog.git'
srcDir = 'fabric_src'
deployDir = 'fabric_deploy'

def beforeSetup():
	local('npm install -g bower grunt-cli forever')

def clone():
	local("rm -rf ~/%(src)s" %{'src': srcDir})
	local("cd; git clone %(url)s %(src)s; cd -" %{'url': githubUrl, 'src': srcDir})

def update():
	local("cd %(src)s; git pull; cd -" %{'url': githubUrl, 'src': srcDir})

def afterClone():
	local("cd ~/%(src)s/; npm install; bower install; cd -" %{'src': srcDir})

def build():
	local("cd ~/%(src)s/; grunt build; cd -" %{'src': srcDir})
	local("rm -rf ~/%(dest)s" %{'dest': deployDir})
	local("mv ~/%(src)s/dist ~/%(dest)s" %{'src': srcDir, 'dest': deployDir})

def restartNode():
	local("forever stopall")
	local("cd ~/%(dest)s; forever start server/app.js; cd -" %{'dest': deployDir})

def restartNginx():
	local("sudo service nginx restart")

def setupDeploy():
	beforeSetup()
	clone()
	afterClone()
	build()
	restartNode()
	restartNginx()

def updateDeploy():
	update()
	build()
	restartNode()
	restartNginx()
