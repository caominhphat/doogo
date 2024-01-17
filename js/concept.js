    // Dropdown on mouse hover
    $(document).ready(function () {

        // Get list concepts
        getListConcept();
    });

    // Get list concepts
    function getListConcept() {
        $.ajax({
            url: "https://doogomedia.com.vn/api/concept/list-app",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if(data.status == 200 && data.data) {
                    concepts = data.data

                    let concept_content = ""
                    $.each(concepts, function (index, item) {
                        let concept = '<div class="mySlides fade-concept">' +
                            // '<div class="numbertext">' + (index + 1) + '/' + concepts.length + '</div>' +
                            '<img src="' + item.image_url + '" style="width:100%">' +
                            '<div class="mySlideText" style="margin-top: 60px"><h4>' + item.name + '</h4><p>' + item.description + '</p></div>' +
                            '</div>'
                        concept_content += concept
                    });
                    // concept_content += '<a class="prev" onclick="plusSlides(-1)">❮</a>'
                    // concept_content += '<a class="next" onclick="plusSlides(1)">❯</a>'
                    document.getElementById("concept_content").innerHTML = concept_content;

                    let concept_slide_number = ""
                    $.each(concepts, function (index, item) {
                        concept_slide_number += '<span class="dot" onclick="currentSlide(' + index + ')"></span>'
                    });
                    document.getElementById("concept_slide_number").innerHTML = concept_slide_number;

                    showSlides(1)

                    setInterval(function(){ showSlides(++slideIndex); }, 3000);
                }

            },
            error: function (error) {
                console.log(error)
            }
        });
    }

    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      n = parseInt(n)
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
    }


