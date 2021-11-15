# hotel-waitlist-system-mobile

**In terminal:**

```shell
docker run -p 3000:3000 -p 27017:27017 -p 5000:5000 -dit IMAGE_NAME
```

**In the docker's terminal:**

1. Install MongoDB [can skip it if MongoDB is already installed ]

```shell
apt install gnupg
apt install curl
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list 
apt update
apt install mongodb-org
apt install screen
mkdir -p /data/db
screen mongod # Press Ctrl+a followed by d to return to terminal
mongo # This will open a mongoDB CLI
exit
```

2. Clone the repository inside docker container and run the sever

```shell
git clone https://github.com/syuan00/hotel-waitlist-system-mobile.git
cd hotel-waitlist-system-mobile/server
npm install
npm run compile
mongo waitlistdb scripts/init.mongo.js
npm start
```

**In  browser:**

Open http://localhost:3000/

Open http://localhost:3000/graphql

```javascript
query {
  customer(id:1) {
    id
    name
    phone
    timestamp
  }
}

query {
  customerList {
    id
    name
    phone
    timestamp
  }
}

mutation {
  customerAdd(customer:{
    name: "Paul"
    phone: "45389625"
  }) {
    id
    timestamp
  }
}

mutation {
  customerDelete(id:3)
}
```

**In terminal:**

```shell
git clone https://github.com/syuan00/hotel-waitlist-system-mobile.git
cd hotel-waitlist-system-mobile/client
npm install
react-native run-android
```

![untitled](https://tva1.sinaimg.cn/large/008i3skNgy1gwg1umvppcg30u01hchdu.gif)

![image-20211115193346303](https://tva1.sinaimg.cn/large/008i3skNgy1gwg2crcsi2j30ly07x74k.jpg)

