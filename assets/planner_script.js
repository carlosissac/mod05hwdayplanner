//MAIN JQUERY FUNCTION THAT ENCAPSULATES THE WHOLE DOM
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
        "displayDay": "",
        "displayMonth" : "",
        "displayYear" : "", 

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
            $("#display-day").text(this.today.format('l'));    
        },

        subsOneDisplayDay: function() {
            //moemnt.js month from 0-11
            this.displayDate = this.displayDate.subtract(1, 'days');
            this.displayDay = this.displayDate.get('date');
            this.displayMonth = this.displayDate.get('month');
            this.displayYear = this.displayDate.get('year');
        },

        addOneDisplayDay: function() {
            //moemnt.js month from 0-11
            this.displayDate = this.displayDate.add(1, 'days');
            this.displayDay = this.displayDate.get('date');
            this.displayMonth = this.displayDate.get('month');
            this.displayYear = this.displayDate.get('year');
        },

        setDisplayDate: function() {
            //moemnt.js month from 0-11
            //var bd = moment();
            //var bd2 = bd.year("1978").month("0").date("19");
            //console.log(bd2.format('ll'));
            this.clearLSLoadMock();
            this.fetchLS();
            //console.log(this.ec);
            var id2 = this.createSingleEvent("5","5","2020","20","Commute","GYYYYYYMMMM");
            //console.log(this.ec);
            var id1 = this.getEventID(2);
            if(id2){
                    this.updateSingleEvent(id2,"XXXXXX","MEEEEEETING", true);
                }
            //console.log(this.ec);
            this.removeSingleEvent(id2);
            return 0;
        }

    };

    dp = dayPlanner;
    
    $("#day-less").click(function(event) {
        event.preventDefault();
        dp.subsOneDisplayDay();
        dp.displayDateUI();
    });

    $("#day-more").click(function(event) {
        event.preventDefault();
        dp.addOneDisplayDay();
        dp.displayDateUI();
    });

    function initialState() {
    
        dp.storeTodaysDate();
        dp.displayDateUI();
        //create UI List 

        dp.setDisplayDate();
        return 0;
    }

    initialState();
});
