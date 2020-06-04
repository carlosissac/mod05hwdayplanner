//MAIN JQUERY FUNCTION THAT ENCAPSULATES THE WHOLE DOM
$(document).ready(function() {

    var dayPlanner = {
        "eh" : eventHandler, /// Event Obj
        "today" : "",
        "displayDate" : "",
        "displayDay" : "",
        "displayMonth" : "",
        "displayYear" : "",
        "gotoDay" : "", 
        "gotoMonth" : "",
        "gotoYear" : "",
        "timeFormat" :  false, //false = AMPM, true = 24HR

        storeTodaysDate: function() {
            this.today = moment();
            this.displayDate = this.today;
            return 0;
        },

        displayDateUI: function() {
            $("#display-day").text(this.today.calendar());    
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
            this.eh.clearAllLoadMockData();
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
