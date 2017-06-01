const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line',function(line) {
    const num = line;
    if(num>50||parseInt(num)>50){

        return Error
    }
    rl.on('line',function(line){
        var tokens = line.split(' ');
        var tag = null;
       	var index = 1;
        tokens.sort();
        for(price of tokens){
            if(price>1000){
                console.log(-1);
                return;
            }
            if(!tag){
                tag = price;
                continue;
            }
			if(tag!==price){
                tag = price;
                index++;
                if(index === 3){
                    console.log(price);
                    return;
                }else{
                    continue
                }
            }
        }
        console.log(-1)
        return;
    })
})