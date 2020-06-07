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
        "displayFormat" : true,

        "realHour_buffer" : 0,
        "eventId_buffer" : 0,

        saveEventId: function(event_Id) {
            this.eventId_buffer = event_Id;
            return 0;
        },

        getEventId: function() {
            return this.eventId_buffer;
        },

        saveRealHour: function(hour) {
            this.realHour_buffer = hour;
            return 0;
        },

        getRealHour: function() {
            return this.realHour_buffer;
        },

        clearLS: function() {
            this.eh.clearLS();
            this.fetchLS();
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

        lbType: function(hour) {
            var disp_date = this.displayDate;
            disp_date.hour(hour).minute(0).seconds(0).milliseconds(0);
            var i = 0;
            while(i<this.ec.length) {
                var ev_obj = this.ec[i].mom_obj;
                var same = disp_date.isSame(ev_obj,'hour');
                if(same) {
                    return this.ec[i].e_type;
                }
                i++;
            }
            return 0;
        },

        lbEventID: function(hour) {
            var disp_date = this.displayDate;
            disp_date.hour(hour).minute(0).seconds(0).milliseconds(0);
            var i = 0;
            while(i<this.ec.length) {
                var ev_obj = this.ec[i].mom_obj;
                var same = disp_date.isSame(ev_obj,'hour');
                if(same) {
                    return this.ec[i].e_id;
                }
                i++;
            }
            return 0;
        },

        lbDesc: function(hour) {
            var disp_date = this.displayDate;
            disp_date.hour(hour).minute(0).seconds(0).milliseconds(0);
            var i = 0;
            while(i<this.ec.length) {
                var ev_obj = this.ec[i].mom_obj;
                var same = disp_date.isSame(ev_obj,'hour');
                if(same) {
                    return this.ec[i].e_desc;
                }
                i++;
            }
            return "";
        },

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
            this.fetchLS();
            $("#plan-table-body").empty();
            var i=0;
            while(i<24) {
                
                //////TR STARTS/////
                var e_id = this.lbEventID(i);
                var tr = document.createElement("tr");
                $(tr).attr("id","plan-list-row");

                if(this.lbTimeValidator(i) === 0) {
                    $(tr).attr("class","table-secondary");
                    $(tr).attr("e-stat",0);
                }
                else if (this.lbTimeValidator(i) === 1) {
                    $(tr).attr("class","table-danger");
                    $(tr).attr("id","is-current");
                    $(tr).attr("e-stat",1);
                }
                else if (this.lbTimeValidator(i) === 2) {
                    $(tr).attr("class","table-default");
                    $(tr).attr("id","is-open");
                    $(tr).attr("e-stat",2);
                }
                $(tr).attr("event-id",e_id);
                $(tr).attr("real-hour",i);
                //////TR ENDS/////

                //////TD0 STARTS/////
                var td0 = document.createElement("td");
                $(td0).attr("id","plan-tbl-bdy-cel0");
                $(td0).text(this.lbTimeFormatHandler(i));
                $(tr).attr("e-hr",this.lbTimeFormatHandler(i));
                $(tr).attr("e-day",this.displayDate.format('l'));
                $(tr).append(td0);
                //////TD0 ENDS/////

                //////TD1 STARTS/////
                var td1 = document.createElement("td");
                $(td1).attr("id","plan-tbl-bdy-cel1");
                if(e_id) {
                    $(td1).text(this.lbDesc(i));
                }
                else {
                    $(td1).text("");
                }
                $(tr).append(td1);
                //////TD1 ENDS/////

                //////TD2 STARTS/////
                var td2 = document.createElement("td");
                $(td2).attr("id","plan-tbl-bdy-cel2");
                var sp = document.createElement("span");
                $(sp).attr("id","plan-badge");
                if(e_id) {
                    if ((this.lbType(i)) === "In-Person") {    
                        $(sp).attr("class","badge badge-warning");
                        $(sp).text("In-Person");
                    }
                    else if ((this.lbType(i)) === "Commute") {
                        $(sp).attr("class","badge badge-primary");
                        $(sp).text("Commute");
                    }
                    else if ((this.lbType(i)) === "Task") {
                        $(sp).attr("class","badge badge-info");
                        $(sp).text("Task");
                    }
                    else if ((this.lbType(i)) === "Personal") {
                        $(sp).attr("class","badge badge-success");
                        $(sp).text("Personal");
                    }
                    $(td2).append(sp); 
                }
                else {
                    if((this.lbTimeValidator(i) === 0) || (this.lbTimeValidator(i) === 1)) {
                        //we will have to review once we have eventContainer plugged in 
                    }
                    else if (this.lbTimeValidator(i) === 2) {
                        $(sp).attr("class","badge badge-dark");
                        $(sp).text("Open");
                        $(td2).append(sp); 
                    }
                }
                $(tr).append(td2);
                //////TD2 ENDS/////
                $("#plan-table-body").append(tr);
                i++;
            }

            var dd = this.displayDate;
            var td = this.today;
            var same = dd.isSame(td,'day');
            if(same) {
                $("#is-current")[0].scrollIntoView();
            }
            return 0;
        },

        modalEventInfoLoad: function(event_id) {
            var i=0;
            while(i<this.ec.length) {
                if(this.ec[i].e_id === event_id) {
                    var desc = this.ec[i].e_desc;
                    $("#edit-modal-eventname").val(desc);
                    var rad = this.ec[i].e_type;
                    if(this.ec[i].e_type === "In-Person") {
                        $("#edit-rad1").prop('checked', true);
                    }
                    else if(this.ec[i].e_type === "Commute") {
                        $("#edit-rad2").prop('checked', true);
                    }
                    else if(this.ec[i].e_type === "Task") {
                        $("#edit-rad3").prop('checked', true);
                    }
                    else if(this.ec[i].e_type === "Personal") {
                        $("#edit-rad4").prop('checked', true);
                    }
                    else {
                        //console.log("NA modalEventInfoLoad");
                    }
                    var val = this.ec[i].e_val;
                    break;
                }
                i++;
            }
            return 0;
        },

        ///timerupdatedevent
        userEditedEvent: function(e_id,event_desc,event_type) {
            var res = this.eh.updateToLS(e_id,event_desc,event_type,true);
            if(!res) {
                this.fetchLS();
                this.listBuilder();
                return 0;
            }
            else {
                return 1;
            }
        },

        createNewEvent: function(moment_obj,event_desc,event_type) {
            var event_id = this.eh.saveToLS(moment_obj,event_desc,event_type,true);
            if(event_id) {
                this.fetchLS();
                this.listBuilder();
                return event_id;
            }
            else {
                return 0;
            }
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

        storeTodaysDate: function() {
            this.today = moment();
            this.displayDate = moment();
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

        timeFormatToggle: function() {
            if(this.displayFormat) {
                this.displayFormat = false;
                $("#time-format-lbl").text("24Hrs.");
            }
            else {
                this.displayFormat = true;
                $("#time-format-lbl").text("AM.PM");
            }
        },

        scheduler: function() {

        }

    };

    dp = dayPlanner;

    $("#edit-modal-btn-cancel").click(function(event) {
        $("#edit-modal").modal("hide"); 
    });

    $("#edit-modal-btn-ok").click(function(event) {
        var e_id = dp.getEventId();
        var e_desc = $("#edit-modal-eventname").val();
        var e_type = $('input[name=edit-rad-modal]:checked').val();

        if(e_desc) {
            dp.userEditedEvent(e_id,e_desc,e_type);
            $("#edit-modal").modal("hide");
        }
        else {
            $("#edit-modal-msgarea").text("Description Missing");
            $("#edit-modal-msgarea").css('color', 'red');
        }
    });

    $("#new-modal-btn-cancel").click(function(event) {
        $("#new-modal").modal("hide"); 
    });
    
    $("#new-modal-btn-ok").click(function(event) {
        var e_desc = $("#new-modal-eventname").val();
        var e_type = $('input[name=new-rad-modal]:checked').val();
        var dd = dp.displayDate;
        var rh = dp.getRealHour();
        dd.hour(rh).minute(0).seconds(0).milliseconds(0);
        if(e_desc) {
            dp.createNewEvent(dd,e_desc,e_type);
            $("#new-modal").modal("hide");
        }
        else {
            $("#new-modal-msgarea").text("Description Missing");
            $("#new-modal-msgarea").css('color', 'red');
        }
    });

    $(document.body).on("click", "tr[event-id]", function() {
        var eid = Number($(this).attr('event-id'));
        var es = Number($(this).attr('e-stat'));
        var ehr = String($(this).attr('e-hr'));
        var ed = String($(this).attr('e-day'));
        var rh = Number($(this).attr("real-hour"));
        dp.saveRealHour(rh);
        dp.saveEventId(eid);

        if(!eid && (es === 2)) {
            $("#new-modal-eventname").val("");
            $("#new-modal-msgarea").text("");
            $("#new-modal-msgarea").css('color', 'black');
            $("#new-rad1").prop('checked', true);
            $("#new-date-modal2-lbl").text(ed + " " + ehr);
            $("#new-modal").modal("show");
        }
        else if (eid && (es === 2)) {
            dp.modalEventInfoLoad(eid);
            $("#edit-modal").modal("show");
        }
        else {
            console.log("NOTHING ON CLICK");
        }
    });

    $("#clear-modal-btn-ok").click(function(event) {
        dp.clearLS();
        dp.fetchLS();
        dp.listBuilder();
        $("#clear-modal").modal("hide");
    });

    $("#clear-modal-btn-cancel").click(function(event) {
        $("#clear-modal").modal("hide"); 
    });

    $("#nav-clear").click(function(event) {
        $("#clear-modal").modal("show"); 
        $("#clear-modal-msgarea").val("All events will be cleared from Storage.\nClick \"OK\" to proceed and \"Cancel\" to exit.");
    });

    $("#mock-modal-btn-ok").click(function(event) {
        dp.clearLSLoadMock();
        dp.fetchLS();
        dp.listBuilder();
        $("#mock-modal").modal("hide"); 
    });

    $("#mock-modal-btn-cancel").click(function(event) {
        $("#mock-modal").modal("hide"); 
    });

    $("#nav-mock").click(function(event) {
        $("#mock-modal").modal("show"); 
        $("#mock-modal-msgarea").val("All events will be cleared from Storage and 8 Mock events be loaded for testing purposes.\n4 will be 2 hours apart from each other starting from now into the future, 4 will 2 hours apart from each other into the past.\nClick \"OK\" to proceed and \"Cancel\" to exit.");
    });

    $("#nav-format").click(function(event) {
        dp.timeFormatToggle();
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
        if(dp.displayFormat) {
            $("#time-format-lbl").text("AM.PM");
        }
        else {
            $("#time-format-lbl").text("24Hr.");
        }
        dp.listBuilder();
        dp.scheduler();
        return 0;
    }   

    currentState();

    var count = 0;
    setInterval(function(){
        count++;
        console.log(count);
        if(count>15) {
            count = 0;
            dp.fetchLS();
            dp.listBuilder();
        }

    }, 1000);

});
