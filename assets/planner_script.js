$(document).ready(function() {

    var dayPlanner = {

        "eh" : eventHandler, //eventhandler obj
        "ec" : [], //eventcontainer
        "e_id" : "", //event id
        "e_mom" : "", //moment.js obj
        "e_type" : "", //event_type 
        "e_desc" : "", //event description
        "e_valid" : "", //event valid/invalid

        "today" : "",
        "displayDate" : "",
        "displayFormat" : true, //AMPM = true, 24hour = false

        lbTimeFormatHandler: function(hour) {
            if(this.displayFormat) {
                //AMPM
                if(hour<13) {
                    //AM
                    if(!hour) {
                        return "12AM";
                    }
                    else if ((hour>0) && (hour<10)) {
                        return "0" + hour + "AM";
                    }
                    else {
                        return hour + "AM";
                    }
                }
                else {
                    //PM
                    //return (hour-=12) + "PM";
                    if ((hour>12) && (hour<20)) {
                        return "0" + (hour-=12) + "PM";
                    }
                    else {
                        return (hour-=12) + "PM";
                    }
                }
            }
            else {
                //24Hour
                if(hour<10) {
                    return "0" + hour + "Hrs.";
                }
                else { 
                    return hour + "Hrs.";
                }

            } 
            return 0;
        },

        lbTimeValidator: function(hour) {
            var disp_date = this.displayDate;
            disp_date.hour(hour).minute(0).seconds(0).milliseconds(0);
            var before = disp_date.isBefore(moment(),'hour');
            if(before) {
                return 0;
            }
            else {
                var current = disp_date.isSame(moment(),'hour');
                if(current) {
                    return 1;
                }
                else {
                    var after = disp_date.isAfter(moment(),'hour');
                    if (after) {
                        return 2;
                    }
                    else {
                        console.log("listBuilderTimeValidator: NA");
                    }
                }
            }
        },

        listBuilder: function() {
            //console.log(this.displayDate.format('ll'));
            //console.log(this.listBuilderTimeValidator(1));
            $("#plan-table-body").empty();
            var i=0;
            while(i<24){
                var tr = document.createElement("tr");
                if(this.lbTimeValidator(i) === 0) {
                    $(tr).attr("class","table-secondary"); 
                }
                else if (this.lbTimeValidator(i) === 1) {
                    $(tr).attr("class","table-danger"); 
                }
                else if (this.lbTimeValidator(i) === 2) {
                    $(tr).attr("class","table-default"); 
                }
                var td0 = document.createElement("td");
                $(td0).attr("id","plan-tbl-bdy-cel0");
                $(td0).text(this.lbTimeFormatHandler(i));
                $(tr).append(td0);

                var td1 = document.createElement("td");
                $(td1).attr("id","plan-tbl-bdy-cel1");
                $(td1).text("");
                $(tr).append(td1);

                var td2 = document.createElement("td");
                $(td2).attr("id","plan-tbl-bdy-cel2");
                if((this.lbTimeValidator(i) === 0) || (this.lbTimeValidator(i) === 1)) {
                    //we will have to review once we have eventContainer plugged in 
                }
                else if (this.lbTimeValidator(i) === 2) {
                        var sp = document.createElement("span");
                        $(sp).attr("class","badge badge-dark");
                        $(sp).text("Open");
                        $(td2).append(sp); 
                }
                $(tr).append(td2);
                $("#plan-table-body").append(tr);
                i++;
            }

            return 0;
        },

        clearLSLoadMock: function() {
            this.eh.clearLSLoadMock();
            return 0;
        },

        fetchLS: function() {
            this.ec = this.eh.getLS();
            return 0;
        },

        clearEventVariables: function() {
            this.e_id = "";
            this.e_mom = "";
            this.e_type = "";
            this.e_desc = "";
            this.e_valid = "";
        },

        createSingleEvent: function(month, day, year, hour, type, desc) {
            this.e_mom = moment({ years: year, months: month, date: day, hours: hour, minutes:'0', seconds:'0', milliseconds:'0'});
            this.e_type = type;
            this.e_desc = desc;
            this.e_valid = true;
            this.e_id = this.eh.saveToLS(this.e_mom,this.e_type,this.e_desc,this.e_valid);
            this.fetchLS();
            return this.e_id;
        },

        getEventContainerLenght: function() {
            return this.ec.length();
        },

        getEventID: function(index) {
            return this.ec[index].e_id;
        },

        removeSingleEvent: function(e_id) {
            var i=0;
            while(i<this.ec.length){
                if(this.ec[i].e_id === e_id) {
                    this.ec.splice(i, 1);
                    this.eh.removeSingleLS(e_id);
                    this.fetchLS();
                    break;
                }
                i++;
            }
            return 0;
        },

        updateSingleEvent: function(e_id, type, desc, valid) {
            var i=0;
            while(i<this.ec.length){
                if(this.ec[i].e_id === e_id) {
                    this.ec[i].e_type = type;
                    this.ec[i].e_desc = desc;
                    this.ec[i].e_valid = valid;
                    this.eh.updateToLS(e_id,type,desc,valid);
                    this.fetchLS();
                    break;
                }
                i++;
            }
            return 0;
        },

        storeTodaysDate: function() {
            this.today = moment();
            this.displayDate = this.today;
            return 0;
        },

        displayDateUI: function() {
            $("#display-day").text(this.displayDate.format('l'));    
        },

        subsOneDisplayDay: function() {
            this.displayDate = this.displayDate.subtract(1, 'days');  
        },

        addOneDisplayDay: function() {
            this.displayDate = this.displayDate.add(1, 'days');
        },

        setDisplayDate: function() {
            //moemnt.js month from 0-11
            //var bd = moment();
            //var bd2 = bd.year("1978").month("0").date("19");
            //console.log(bd2.format('ll'));
            //this.clearLSLoadMock();
           // this.fetchLS();
            //console.log(this.ec);
            //var id2 = this.createSingleEvent("5","5","2020","20","Commute","GYYYYYYMMMM");
            //console.log(this.ec);
            //var id1 = this.getEventID(2);
            //if(id2){
            //this.updateSingleEvent(id2,"XXXXXX","MEEEEEETING", true);
            //}
            //console.log(this.ec);
            //this.removeSingleEvent(id2);
            return 0;
        },

        /* timeFormatToggle: function() {
            if(this.displayFormat) {
                $("#nav-format").text("24Hr");

            }
            else{
                $("#nav-format").text("AMPM");
            }

        }*/

    };

    dp = dayPlanner;

    /*$("#nav-format").click(function(event) {
        
        dp.timeFormatToggle();
        console.log("cliiiiiick");
    });*/

    $("#day-less").click(function(event) {
        event.preventDefault();
        dp.subsOneDisplayDay();
        dp.displayDateUI();
        dp.listBuilder();
    });

    $("#day-less").click(function(event) {
        event.preventDefault();
        dp.subsOneDisplayDay();
        dp.displayDateUI();
        dp.listBuilder();
    });

    $("#day-more").click(function(event) {
        event.preventDefault();
        dp.addOneDisplayDay();
        dp.displayDateUI();
        dp.listBuilder();
    });




    function currentState() {
        dp.storeTodaysDate();
        dp.displayDateUI();
        dp.listBuilder();
        //dp.timeFormatToggle();
        //create UI List 
        //dp.setDisplayDate();
        return 0;
    }

    currentState();
});
