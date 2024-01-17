    var services = [];
    var services_selected = [];
    var time_selected = null;
    var hourBooking = 1
    
    // Dropdown on mouse hover
    $(document).ready(function () {

        // Get list services
        getListServices();

        // Get list services
        getListSchedules();
    });

    $("#date").on("change.datetimepicker", ({date, oldDate}) => {
        if(oldDate) {
            getListSchedules();
        }
    })

    // Get list services
    function getListServices() {
        $.ajax({
            url: "https://doogomedia.com.vn/api/concept/get-options",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if(data.status == 200 && data.data) {
                    services = data.data

                    $.each(services, function (i, item) {
                        $('#serviceSelect').append($('<option>', {
                            value: item.value,
                            text : item.text
                        }));
                    });
                }

            },
            error: function (error) {
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-danger').append($("<strong>").text(""));
                $('#success > .alert-danger').append('</div>');
                $('#appointmentForm').trigger("reset");
            }
        });
    }

    function selectTime(time) {
        time_selected = time

        calHourBooking()
    }

    function selectTimeSlot() {
        const d = new Date();
        let hour = d.getHours();

        if(hour < 12) {
            $('#timeSlotMorning').click()
            $('#timeSlotMorning').focus()
        } else {
            if(hour >= 12 && hour < 18) {
                $('#timeSlotAfternoon').click()
                $('#timeSlotAfternoon').focus()
            } else {
                $('#timeSlotNight').click()
                $('#timeSlotNight').focus()
            }
        }
    }

    // Get list schedules
    function getListSchedules() {
        // Loader
        $('#scheduleContentLoader').show();

        time_selected = null;
        let date_input = $('#dateInput').val();
        if(!date_input) {
            date_input = null
        }

        $.ajax({
            url: "https://doogomedia.com.vn/api/booking/get-schedules",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                photo_boxs: services_selected,
                date: date_input ? date_input : moment().format("YYYY-MM-DD"),
                current_time: moment().format("YYYY-MM-DD HH:mm:ss")
            }),
            cache: false,
            success: function (data) {
                if(data.status == 200 && data.data) {
                    let schedules = data.data.schedules

                    if (schedules) {
                        // Morning schedule
                        let morning_items = schedules.morning
                        let morning_html = ""
                        $.each(morning_items, function (i, item) {
                            let dis_str = ""
                            if (item.status == "UNAVAILABLE") {
                                dis_str = "disabled"
                            }
                            morning_html += "<button onclick='selectTime(\"" + item.time + "\")' class='btn btn-outline-secondary mt-sm-1 ml-1' type='button' style='height: 47px; width: 94px' " + dis_str + ">" + item.time + "</button>"
                        });
                        $('#schedule_morning').html(morning_html)

                        // Afternoon schedule
                        let afternoon_items = schedules.afternoon
                        let afternoon_html = ""
                        $.each(afternoon_items, function (i, item) {
                            let dis_str = ""
                            if (item.status == "UNAVAILABLE") {
                                dis_str = "disabled"
                            }
                            afternoon_html += "<button onclick='selectTime(\"" + item.time + "\")' class='btn btn-outline-secondary mt-sm-1 ml-1' type='button' style='height: 47px; width: 94px' " + dis_str + ">" + item.time + "</button>"
                        });
                        $('#schedule_afternoon').html(afternoon_html)

                        // Night schedule
                        let night_items = schedules.night
                        let night_html = ""
                        $.each(night_items, function (i, item) {
                            let dis_str = ""
                            if (item.status == "UNAVAILABLE") {
                                dis_str = "disabled"
                            }
                            night_html += "<button onclick='selectTime(\"" + item.time + "\")' class='btn btn-outline-secondary mt-sm-1 ml-1' type='button' style='height: 47px; width: 94px' " + dis_str + ">" + item.time + "</button>"
                        });
                        $('#schedule_night').html(night_html)

                        // Set default: morning
                        $('#schedule_afternoon')[0].style.display = "none";
                        $('#schedule_night')[0].style.display = "none";
                    }

                    // Hide Loader
                    $('#scheduleContentLoader').hide();

                    // Select time slot
                    selectTimeSlot()
                }
            },
            error: function () {
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                $('#success > .alert-danger').append('</div>');
                $('#appointmentForm').trigger("reset");

                // Hide Loader
                $('#scheduleContentLoader').hide();
            }
        });
    }

    // function backToTop() {
    //     $('html, body').animate({
    //         scrollTop: $("#appointment_content").offset().top
    //     }, 1000);
    // }

    // Get list services
    $('#confirmMakeAppointment').click(function(){
        let customer_name = $('#nameInput').val();
        let customer_phone = $('#phoneInput').val();
        let hour_booking = $('#hourBooking').val();
        if(!hour_booking) {
            hour_booking = hourBooking
        }
        let customer_email = $('#emailInput').val();
        let customer_gender = $('#genderSelect').val();
        if(!customer_gender || customer_gender == "" || customer_gender == "null") {
            customer_gender = "Anh/Chị"
        }
        let appointment_date = $('#dateInput').val();
        let from_hour = time_selected;
        let note = $('#noteInput').val();

        // Validate here
        let message = "";
        if(!customer_name || !customer_phone) {
            message += "Tên hoặc số điện thoại không thể trống. "
        }
        if(!appointment_date || !from_hour) {
            message += "Ngày, giờ hẹn không thể trống. "
        }
        if(services_selected.length == 0) {
            message += "Xin hãy chọn dịch vụ mong muốn. "
        }
        if(message) {
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-danger').append($("<strong>").text(message));
            $('#success > .alert-danger').append('</div>');

            // backToTop();

            return;
        }

        if(checkEmail() == false || checkPhoneNumber() == false) {
            return
        }

        let dataPost = {
                current_time: moment().format("YYYY-MM-DD HH:mm:ss"),
                customer_name: customer_name,
                customer_phone: customer_phone,
                customer_gender: customer_gender,
                customer_email: customer_email,
                appointment_date: appointment_date,
                from_hour: from_hour,
                hour_booking: hour_booking,
                photo_boxs: services_selected,
                note: note
        }

        console.log(dataPost)

        $.ajax({
            url: "https://doogomedia.com.vn/api/booking/add",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(dataPost),
            cache: false,
            success: function (data) {

                // TODO: handle data schedules here
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-success')
                    .append("<strong>Đặt lịch hẹn thành công!. </strong>");
                $('#success > .alert-success')
                    .append('</div>');
                $('#appointmentForm').trigger("reset");

                // Reset data
                services_selected = [];
                generateHtmlListService()

                // Back to top
                getListSchedules();
            },
            error: function (err) {
                if(err && err.status == 422) {
                    let responseJSON = err.responseJSON
                    if (responseJSON) {
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-danger').append($("<strong>").text(responseJSON.mess));
                        $('#success > .alert-danger').append('</div>');
                    }

                } else {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Đặt lịch hẹn không thành công! Xin hãy liên hệ trực tiếp với chúng tôi qua số điện thoại tại trang Liên hệ"));
                    $('#success > .alert-danger').append('</div>');
                    $('#appointmentForm').trigger("reset");
                }


                // Back to top
                // backToTop()
            }
        });
    })

    // Event click time slot
    $('#timeSlotMorning').click(function(){
        $('#schedule_morning')[0].style.display = "block";
        $('#schedule_afternoon')[0].style.display = "none";
        $('#schedule_night')[0].style.display = "none";
    });
    $('#timeSlotAfternoon').click(function(){
        $('#schedule_morning')[0].style.display = "none";
        $('#schedule_afternoon')[0].style.display = "block";
        $('#schedule_night')[0].style.display = "none";
    });
    $('#timeSlotNight').click(function(){
        $('#schedule_morning')[0].style.display = "none";
        $('#schedule_afternoon')[0].style.display = "none";
        $('#schedule_night')[0].style.display = "block";
    });

    // Get service by id
    function getServiceById(id) {
        for (let i = 0; i < services.length; i++) {
            if(services[i].value == id) {
                return services[i]
            }
        }
        return null;
    }

    // Delete service selected
    function removeServiceSelected(index) {
        services_selected.splice(index, 1);
        generateHtmlListService()

        getListSchedules()

        calHourBooking()
    }

    function calHourBooking() {
        let date_input = $('#dateInput').val();

        if(date_input && time_selected) {
          hourBooking = 0
          for(let item in services_selected) {
              hourBooking += 1 //parseInt(item.work_time_minute)
          }

          // let startTime = new Date(date_input + " " + time_selected + ":00")
          // console.log("this.startTime: " + startTime)
          // let leaveTimeTemp = new Date(startTime.getTime() - (startTime.getTimezoneOffset() * 60000)
          //     + (parseInt(total_work_time_minute)*60000)).toISOString()
          // console.log("this.leaveTime: " + leaveTimeTemp.split("T")[1].substring(0,5))
          // leaveTime = leaveTimeTemp.split("T")[1].substring(0,5)
        }
      }

    // Generate html list service
    function generateHtmlListService() {
        let html_gen = ""
        let index = 0
        for (let i = 0; i < services_selected.length; i++) {
            html_gen += "<p> - " + services_selected[i].text
                + "<span class='ml-2' onclick='removeServiceSelected(" + index + ")'><i class='fa fa-trash'></i></span>" +
                "</p>"
            index += 1
        }
        $('#listServiceSelected').html(html_gen)
    }

    // Event choose
    $('#serviceSelect').change(function(){
        let service_id = $('#serviceSelect').val();
        if(service_id) {
            // Kiểm tra xem dv này đã dc chọn chưa
            for (let i = 0; i < services_selected.length; i++) {
                if(services_selected[i].value == service_id) {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Dịch vụ này đã được chọn!"));
                    $('#success > .alert-danger').append('</div>');

                    return;
                }
            }

            let service = getServiceById(service_id);
            if(service) {
                services_selected.push(service)
                generateHtmlListService()

                $('#serviceSelect').val('null');
            }
        }
        calHourBooking()

        getListSchedules()
    })
    
    function checkPhoneNumber() {
        let phone_error_mess = document.getElementById("phone_error_mess");
        let phoneInput = $('#phoneInput').val();
        if(phoneInput) {
            var vnf_regex = /((01|02|03|04|05|06|07|08|09)+([0-9]{8})\b)/g
            if(vnf_regex.test(phoneInput)) {
                if (phone_error_mess) {
                    phone_error_mess.setAttribute("hidden", true);
                    return true
                }
            } else {
                if (phone_error_mess) {
                    phone_error_mess.removeAttribute("hidden");
                    return false
                }
            }
        } else {

          if (phone_error_mess) {
            phone_error_mess.setAttribute("hidden", true);
            return true
          }
        }
        return true
    }
    
    // Event change phone 
    $('#phoneInput').change(function(){
        checkPhoneNumber()
    })

    function checkEmail() {
        let mail_error_mess = document.getElementById("mail_error_mess");
        let emailInput = $('#emailInput').val();
        if(emailInput) {
            var vnf_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            if(vnf_regex.test(emailInput)) {
                if (mail_error_mess) {
                    mail_error_mess.setAttribute("hidden", true);
                    return true
                }
            } else {
                if (mail_error_mess) {
                    mail_error_mess.removeAttribute("hidden");
                    return false
                }
            }
        } else {

          if (mail_error_mess) {
            mail_error_mess.setAttribute("hidden", true);
            return true
          }
        }
        return true
    }

    // Event change phone
    $('#emailInput').change(function(){
        checkEmail()
    })

