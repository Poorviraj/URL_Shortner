const express = require('express');


const server = express();

const PORT = 4000;

server.use(express.json());

const DB = new Map();  // this is our temperory database and fu=the function is known as HASH MAP in javascript


server.get('/get/data', (req,res) => {
    console.log("request received");
    // res.status(200).json({
    //     success: true,
    //     message: 'Data received successfully'
    // })
    res.send({
        success: true,
        message: 'Data received successfully'
    })
})

server.post('/sort_url',(req,res)=> {

    
    const {url} = req.body;
    

    if(!url){
        return res.status(400).json({
            success: false,
            message: 'URL is required'
        })
    }

    const key = generateId(5);

    let abc = {
        url: url,
        count: 0,
        createdAt: new Date().getTime()
    }


    DB.set(key,abc);  // this is setting the key and value in our DB

    res.status(200).json({
        success: true,
        message: 'URL received successfully',
        shortUrl: `http://localhost:${PORT}/${key}`
    })
})


server.get('/:key', (req,res) => {
    const {key} = req.params;
    // console.log(key);

    const isKeyPresent = DB.has(key);  // this is checking that we have the key in our DB or not
    if(!isKeyPresent){
        return res.status(404).json({
            success: false,
            message: 'URL not found'
        })
    }


    const originalUrl = DB.get(key).url;  // this is getting the original URL from the DB
    let originalCount = DB.get(key).count;  // this is getting the count of the URL from the DB
    let originalTime = DB.get(key).createdAt;  // this is getting the time of the URL from the DB
    DB.get(key).count = originalCount + 1;     // this is incrementing the count of the URL by 1
    DB.get(key).createdAt = new Date().getTime();  // this is updating the time of the URL



    if(originalCount >= 5  || new Date().getTime() - originalTime > 60000){  
        console.log('Either you have reached your limit or you are trying to access the URL before 1 minute');
        return res.status(200).json({
            success: false,
            message: 'you have reached your limit'
        })
    }

    res.redirect(originalUrl);
    

})

server.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})




function generateId(charCount) {
    const possibleCharString = 'QWERTYUIOPLKMJNHBGVFCDXSZAqwertyuioplmkjnhbgvfcdxsza1234567890';
    let result = ''
    for(let i=0; i<charCount; i++){
        const uniqueIndex =  parseInt(Math.random()*(possibleCharString.length-1));   // return a number between 0 to  the length of our possibleCharString
        result += possibleCharString[uniqueIndex];
    }
    return result;
}
// console.log(generateId(5));