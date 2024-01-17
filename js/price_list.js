    // Dropdown on mouse hover
    $(document).ready(function () {

        // Get list concepts
        getPriceList();
    });

    // Get list concepts
    function getPriceList() {
        $.ajax({
            url: "https://doogomedia.com.vn/api/price-list/list-app",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if(data.status == 200 && data.data) {
                    let prices = data.data

                    let item_first_class = "gdlr-core-pbf-column gdlr-core-column-20 gdlr-core-column-first"
                    let item_class = "gdlr-core-pbf-column gdlr-core-column-20"
                    let price_item_content_root = document.getElementById("price_list_content").innerHTML

                    let price_list_content = ''
                    $.each(prices, function (index, item) {
                        let item_html = price_item_content_root.replaceAll("upload/shutterstock_568449880-495x600.jpg", item.image_url)
                        if (index == 0) {
                            item_html = item_html.replace("item_class", item_first_class)
                        } else {
                            item_html = item_html.replace("item_class", item_class)
                        }
                        item_html = item_html.replace("price_list_name", item.name)

                        price_list_content += item_html
                    });
                    document.getElementById("price_list_content").innerHTML = price_list_content;
                }

            },
            error: function (error) {
                console.log(error)
            }
        });
    }


