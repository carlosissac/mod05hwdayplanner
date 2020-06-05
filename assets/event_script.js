
var eventHandler = {

    getValidEventID() {
        //GENERATES A RAND NUMBER
        let num = Math.floor(Math.random()*99999);
        //VERIFIES THAT ITS NOT IN LS
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
                j++;
            }
        }
        return num;
    },

    removeSingleLS: function(event_id) {
        ///looks for eventID in buffer and updates values
        var buffer = JSON.parse(localStorage.getItem('eventContainerLS'));
        var i=0;
        while(i<buffer.length) {
            if(buffer[i].e_id === event_id) {
                buffer.splice(i, 1);
                break;
            }
            i++;
        }
        localStorage.setItem('eventContainerLS', JSON.stringify(buffer));
        //console.log(JSON.parse(localStorage.getItem('eventContainerLS')));
        return 0;
    },

    getLS: function() {
        //RETREIVES ALL CONTENTS FROM LS
        //RETURNS ARRAY
        const array = [];
        if(localStorage.getItem('eventContainerLS')) {
            var buffer = JSON.parse(localStorage.getItem('eventContainerLS'));
            for(var j=0; j<buffer.length; j++) {
                array.push(buffer[j]);
            }
            localStorage.setItem('eventContainerLS', JSON.stringify(array));
            //console.log(JSON.parse(localStorage.getItem('eventContainerLS')));
            return array;
        }
        else {
            return null;
        }
    },

    updateToLS: function(event_id, type, desc, valid) {
        ///looks for eventID in buffer and updates values
        var buffer = JSON.parse(localStorage.getItem('eventContainerLS'));
        var i=0;
        while(i<buffer.length) {
            if(buffer[i].e_id === event_id) {
                buffer[i].e_type = type;
                buffer[i].e_desc = desc;
                buffer[i].e_valid = valid;
                break;
            }
            i++;
        }
        localStorage.setItem('eventContainerLS', JSON.stringify(buffer));
        //console.log(JSON.parse(localStorage.getItem('eventContainerLS')));
    },

    saveToLS: function(moment_obj, type, desc, valid) {
        const array = [];
        let new_entry = {
                'e_id' : this.getValidEventID(),
                'mom_obj' : moment_obj,
                'e_type' : type,
                'e_desc' : desc,
                'e_valid' : valid, 
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
            //console.log(JSON.parse(localStorage.getItem('eventContainerLS')));
        }
        return new_entry.e_id;
    },

    clearLSLoadMock: function() {
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
            this.saveToLS(mock,type,desc,true);
            
        }
    }
};


