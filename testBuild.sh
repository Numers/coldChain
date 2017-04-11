#!/bin/bash
# By JackZhu
# @2016/05/27
#用于git服务器自动生成测试配置文件以及测试域名，修改需谨慎！！！！
#
#testBuild.sh
#scriptName $CI_BUILD_REPO $CI_BUILD_REF_NAME  $CI_PROJECT_DIR
#scriptName http://gitlab-ci-token:4673744438469451620c7244723200@hz-gitlab.youzibuy.com/root/test.git  dev
#
#test 123
#
#123
#


#CI_BUILD_REPO  http://gitlab-ci-token:NGe5DAXBz7yzcAMHwZWt@172.19.140.202/xzzhu/test.git
#CI_BUILD_REF_NAME  master  
#CI_PROJECT_DIR /home/gitlab-runner/builds/32ab972b/0/xzzhu/test




if [ $# -lt 3 ]
then
    echo "Usage: $0 please input file " 1>&2
    exit 1
fi

#项目git地址
reponame_tmp="$1"

#项目分支名称
branch="$2"

#项目源代码目录
sourceCode="$3"

#项目名称截取
reponame=`echo $reponame_tmp | awk -F'/' '{print $NF}' |awk -F '.' '{print $1}'`


#测试域名规则定义
hostbash_domain='glp.zmq.cc'
#nginx代码目录
wwwroot='/data/wwwroot/'

nginx_confg_path='/usr/local/nginx/conf/vhosts/'
nginx_bin='/usr/local/nginx/sbin/nginx'

#名字,nginx config ,http://xx.com
hostname=${branch}-${reponame}.${hostbash_domain}

nginx_config_file=${hostname}.conf
nginx_config=${nginx_confg_path}${nginx_config_file}


http_hostname=${hostname}
nginx_root=${wwwroot}${http_hostname}

if [[ -d $nginx_root ]]; then
	#mkdir -p $nginx_root
	sudo /bin/chown -R www.www $nginx_root >> /dev/null 2>&1
	sudo /bin/chmod -R 775 $nginx_root >> /dev/null 2>&1
	rm -rf $nginx_root
fi

scp -r ${sourceCode}/build  $nginx_root


#删除编译文件
rm -f ${nginx_root}/testBuild.sh
rm -f ${nginx_root}/.gitlab-ci.yml


#目录授权
sudo /bin/chown -R www.www $nginx_root >> /dev/null 2>&1
sudo /bin/chmod -R 775 $nginx_root >> /dev/null 2>&1

if [[ -f $nginx_config ]]; then
	echo "test for: http://$http_hostname"
	exit 0 #如果配置文件存在,则说明不用后续操作
fi

cat << EOF > $nginx_config
server {
    listen 80;

    server_name $http_hostname;

    charset utf-8;

    root   $nginx_root;
    index  index.php index.html index.htm;

    gzip on;
    gzip_disable "msie6";
    gzip_types text/plain text/css text/xml text/javascript application/json
        application/x-javascript application/xml application/xml+rss application/javascript;

    error_page 404 = /index.php;

    access_log off;

    client_max_body_size 64m;


    location /. {
        return 404;
    }

	location /user {
            proxy_pass  http://test-member.glp.zmq.cc/user;
            client_max_body_size    500m;
        }

        location /manage {
            proxy_pass  http://test-manage.glp.zmq.cc/manage;
            client_max_body_size    500m;
        }


        location /capacity {
            proxy_pass  http://test-capacity.glp.zmq.cc/capacity;
            client_max_body_size    500m;
        }

        location /api {
            proxy_pass  http://172.16.6.29:8090/api;
            client_max_body_size    500m;
        }

        location /pay {
            proxy_pass  http://172.16.6.29:8080/pay;
            client_max_body_size    500m;
        }




    location ~ /\.ht {
        deny  all;
    }
}
EOF

#nginx_config_check=`sudo $nginx_bin -t >> /dev/null 2>&1 && echo $?`
nginx_config_check=`sudo $nginx_bin -t >> /tmp/test-nginx.log 2>&1 && echo $?`

#重新加载ng的配置信息
if [[ $nginx_config_check == 0 ]]; then
	sudo $nginx_bin -s reload >> /tmp/test-nginx.log 2>&1
	echo "$nginx_bin -s reload"
	echo 'nginx reload ok'
else
	echo "nginx exit code:$nginx_config_check   nginx config error,check it"
	exit 1
fi




if [[ $branch != 'dev' ]]; then
	echo "test for: http://$http_hostname"
	exit 0
fi


if [[ -f /etc/sysconfig/network-scripts/ifcfg-enp0s3 ]]; then
	source /etc/sysconfig/network-scripts/ifcfg-enp0s3
elif [[ -f /etc/sysconfig/network-scripts/ifcfg-eth0 ]]; then
	source /etc/sysconfig/network-scripts/ifcfg-eth0
fi


echo 'script run is ok'
echo 
echo 
echo 'mac for root'
echo "echo $IPADDR  $http_hostname  >> /etc/hosts"
echo
echo 'windows cmd for administrator'
echo 'set hostspath=%windir%\System32\drivers\etc\hosts'
echo "echo $IPADDR  $http_hostname >> %hostspath%"
echo
echo "test for: http://$http_hostname"











