
var eventHandler = {

    "eventHour" :"",
    "eventDay" : "",
    "eventMonth" : "",
    "eventYear" : "",

    "eventType" : "",
    "eventDateObj" : moment(),
    "eventDesc" : "",
    "eventContainerS" : [],


    getValidEventID() {
        //GENERATES A RAND NUMBER
        let num = Math.floor(Math.random()*99999);
        //GETS WHATS IN LS
        const array = [];
        if(localStorage.getItem('eventContainerLS')) {
            var buffer = JSON.parse(localStorage.getItem('eventContainerLS'));
            for(var i=0; i<buffer.length; i++) {
                array.push(buffer[i]);
            }
            var j = 0;
            while(j<array.length) {
                if(array[j].e_id === num) {
                    num = Math.floor(Math.random()*99999);
                    j=0;
                }
                /*else {
                    console.log(array[j].e_id + " " + num);
                }*/
                j++;
            }
        }
        console.log(num);
        return num;
    },

    //saveToLocalStorage: function(moment_obj, type, desc, new_ev, valid) {
    saveToLSNew(moment_obj, type, desc) {
        const array = [];

        let new_entry = {
                'e_id' : this.getValidEventID(),
                'e_new' : true,
                'mom_obj' : moment_obj,
                'e_type' : type,
                'e_desc' : desc,
                'e_valid' : true, 
        };

        /// TAKES NEW EVENT 
        /// APPENDS TO BUFFER
        /// SAVES TO LS
        if(localStorage.getItem('eventContainerLS')) {
            var buffer = JSON.parse(localStorage.getItem('eventContainerLS'));
            for(var i=0; i<buffer.length; i++) {
                array.push(buffer[i]);
            }
        }
        array.push(new_entry);
        localStorage.setItem('eventContainerLS', JSON.stringify(array));

        if(array.length>1) {
            ///TAKES WHATS STORED IN LS 
            ///CREATES A NEW BUFFER
            ///ARRANGES EVENTS FROM NEWEST TO OLDEST
            ///SAVES TO LS
            const array2 = [];
            if(localStorage.getItem('eventContainerLS')) {
                var buffer2 = JSON.parse(localStorage.getItem('eventContainerLS'));
                for(var j=0; j<buffer2.length; j++) {
                    array2.push(buffer2[j]);
                }
            }
            array2.sort((a,b)=> new Date(String(b.mom_obj)).getTime() - new Date(String(a.mom_obj)).getTime());
            localStorage.setItem('eventContainerLS', JSON.stringify(array2));
            console.log(JSON.parse(localStorage.getItem('eventContainerLS')));
        }

        return 0;
    },

    clearAllLoadMockData() {
        this.buffer = [];
        localStorage.clear();
        //4 MOCK EVENTS EVERY OTHER 2 HOURS
        var mock = moment();
        var type = "";
        for(var i=0;i<4;i++) {
            mock.add(2, 'hour');
            if(i === 0) { 
                type = "In-Person";
            }
            else if (i === 1) { 
                type = "Commute";
            }
            else if (i === 2) {
                type = "Task";
            }
            else if (i === 3) {
                type = "Personal";
            }
            else {
                console.log("clearAllLoadMockData NA");
            }
            desc = "DEEEEEEEESC" + i;
            //console.log(mock + " " + type + " " + desc);
            //this.saveToLocalStorage(mock,type,desc,true,true);
            //this.saveToLocalStorage(mock,type,desc);
            this.saveToLSNew(mock,type,desc);
            
        }
    }

};