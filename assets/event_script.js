
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
            return 0;
        }
    },

    updateToLS: function(event_id, desc, type, valid) {
        var buffer = JSON.parse(localStorage.getItem('eventContainerLS'));
        var i=0;
        while(i<buffer.length) {
            if(buffer[i].e_id === event_id) {
                buffer[i].e_desc = desc;
                buffer[i].e_type = type;
                buffer[i].e_valid = valid;
                break;
            }
            i++;
        }
        localStorage.setItem('eventContainerLS', JSON.stringify(buffer));
        //console.log(JSON.parse(localStorage.getItem('eventContainerLS')));
        return 0;
    },

    saveToLS: function(moment_obj, desc, type, valid) {
        const array = [];
        let new_entry = {
                'e_id' : this.getValidEventID(),
                'mom_obj' : moment_obj,
                'e_desc'  : desc,
                'e_type'  : type,
                'e_valid' : valid, 
        };

        if(localStorage.getItem('eventContainerLS')) {
            var buffer = JSON.parse(localStorage.getItem('eventContainerLS'));
            for(var i=0; i<buffer.length; i++) {
                array.push(buffer[i]);
            }
        }
        array.push(new_entry);
        localStorage.setItem('eventContainerLS', JSON.stringify(array));
        if(array.length>1) {
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

        var type1 = "";
        var mock1 = moment();
        for(var i=0;i<4;i++) {
            mock1.subtract(2, 'hour');
            if(i === 0) {
                type1 = "In-Person";
            }
            else if (i === 1) {
                type1 = "Commute";
            }
            else if (i === 2) {
                type1 = "Task";
            }
            else if (i === 3) {
                type1 = "Personal";
            }
            else {
                console.log("clearAllLoadMockData NA");
            }
            desc1 = "DEESC-" + i;
            this.saveToLS(mock1,desc1,type1,false);
        }
        var type2 = "";
        var mock2 = moment();
        for(var j=0;j<4;j++) {
            mock2.add(2, 'hour');
            if(j === 0) {
                type2 = "In-Person";
            }
            else if (j === 1) {
                type2 = "Commute";
            }
            else if (j === 2) {
                type2 = "Task";
            }
            else if (j === 3) {
                type2 = "Personal";
            }
            else {
                console.log("clearAllLoadMockData NA");
            }
            desc2 = "DEESC" + j;
            this.saveToLS(mock2,desc2,type2,true);
        }
    },

    clearLS: function() {
        this.buffer = [];
        localStorage.clear();
        //this.saveToLS(,type,desc,true);          
    },

};


