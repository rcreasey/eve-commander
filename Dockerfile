FROM    centos:6.4
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN     yum install -y npm-1.3.3-1.el6
ADD . /src
RUN cd /src; npm install
EXPOSE  5000
CMD ["node", "/src/index.js"]
