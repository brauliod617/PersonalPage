const processBtn = document.getElementById("processBtn");
const input1 = document.getElementById("horizontal-input-1");
const input2 = document.getElementById("horizontal-input-2");
const input3 = document.getElementById("vertical-input-3");
const input4 = document.getElementById("vertical-input-4");
const forms = document.getElementsByTagName("form");
const table = document.getElementById("table");
const tableDiv = document.getElementById("tableDiv");
const sheets = document.styleSheets[1];
const rules = sheets.rules || sheets.cssRules;
let validationMessage = "Please enter a number";
let tableCreated = false;

input1.value = 0;
input2.value = 0;
input3.value = 0;
input4.value = 0;

let jq_input1;
let jq_input2;
let jq_input3;
let jq_input4;
let jq_slider1;
let jq_slider2;
let jq_slider3;
let jq_slider4;
let jq_tabs_ul;
let jq_tabs_container;
let count = 1;
let jq_saveBtn;

//will only run once the page DOM is ready for JavaScript code to execute.
$(document).ready(function () {
    //get form items
    jq_input1 = $( "#horizontal-input-1" );
    jq_input2 = $( "#horizontal-input-2" );
    jq_input3 = $( "#vertical-input-3" );
    jq_input4 = $( "#vertical-input-4" );

    //get sliders
    jq_slider1 = $("#slider1");
    jq_slider2 = $("#slider2");
    jq_slider3 = $("#slider3");
    jq_slider4 = $("#slider4");

    //contains tabs head and tab items
    jq_tabs_container = $("#tabs_1");
    //contains tab head
    jq_tabs_ul = $("#tabs_ul");

    //get buttons
    jq_saveBtn = $('#saveBtn');
    jq_deleteBtn = $('#deleteBtn');
    jq_deleteAllBtn = $('#deleteAllBtn');

    //initialize tabs
    $(function() {
        $( "#tabs_1" ).tabs();
    });

    //user clicks save table button
    jq_saveBtn.click(function () {
        //prevent user from saving table if one has not been created yet
        if(tableCreated) {
            create_tab();
            //count is used to number tables
            count++;
        }
    });

    //user clicks delete tab
    jq_deleteBtn.click(function () {
        //find and delete active tab
        let activeTab = $("#tabs_1").find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + activeTab).remove();
        $("#tabs_1").tabs( "refresh" );
    });

    //user clicks delete all tabs
    jq_deleteAllBtn.click(function () {
        //delete all tab headers
        $("#tabs_1").find(".ui-tabs-tab").remove();
        //delete all tabs
        $("#tabs_1").find(".ui-tabs-panel").remove();
        $("#tabs_1").tabs( "refresh" );
        //reset count
        count = 1;
    });

    //create tab to be inserted to ul
    function create_tab(){
        //clone current table
        let currentTable = $("#tableDiv").clone();

        //add tab header to tab UL
        jq_tabs_ul.append(
            "<li><a href='#tableDiv" + count + "'>Table" + count +"</a></li>"
        );

        //change tableDiv id
        currentTable.attr("id", "tableDiv" + count);
        currentTable[0].children[0].id = "table" + count;

        jq_tabs_container.append(
            currentTable
        );

        jq_tabs_container.tabs("refresh");
    }

    //validates table is valid, then creates
    function pre_create_table(){
        if( $("form").valid() ){
            create_table();
        }
        else
            validator.focusInvalid();
    }

    let validator = $("form").validate({
        highlight: function (element, errorClass) {
            $(element).fadeOut(function () {
                $(element).fadeIn();
            });
            $(element).addClass("red-border");
            $(element.error).addClass("red-text");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("red-border");
        }
    });

    //limits range of input to -100..100
    //set that each input is required
    //to be used by validator
    jq_input1.rules( "add", {
        required: true,
        range: [-100, 100]
    });
    jq_input2.rules( "add", {
        required: true,
        range: [-100, 100]
    });
    jq_input3.rules( "add", {
        required: true,
        range: [-100, 100]
    });
    jq_input4.rules( "add", {
        required: true,
        range: [-100, 100]
    });


    //updates sliders to match form value as form value change
    //calls pre_create_table to start table creating process whenever a value is changed
    jq_input1.keyup(function () {
        jq_slider1.slider({
            value: input1.value
        });
        pre_create_table();
    });
    jq_input2.keyup(function () {
        jq_slider2.slider({
            value: input2.value
        });
        pre_create_table();
    });
    jq_input3.keyup(function () {
        jq_slider3.slider({
            value: input3.value
        });
        pre_create_table();
    });
    jq_input4.keyup(function () {
        jq_slider4.slider({
            value: input4.value
        });
        pre_create_table();
    });

    //limits range of sliders to -100..100
    //updates value forms to match sliders value as sliders value change
    //calls pre_create_table to start table creating process whenever a value is changed
    $(function() {
        jq_slider1.slider({
            max: 100,
            min: -100,
            slide: function (event, ui) {
                input1.value = ui.value;
                pre_create_table();
            }
        });
        jq_slider2.slider({
            max: 100,
            min: -100,
            slide: function (event, ui) {
                input2.value = ui.value;
                pre_create_table();
            }
        });
        jq_slider3.slider({
            max: 100,
            min: -100,
            slide: function (event, ui) {
                input3.value = ui.value;
                pre_create_table();
            }
        });
        jq_slider4.slider({
            max: 100,
            min: -100,
            slide: function (event, ui) {
                input4.value = ui.value;
                pre_create_table();
            }
        });
    } );



    function create_table(){
        let t_one = parseInt(input1.value);
        let t_two = parseInt(input2.value);
        let t_three = parseInt(input3.value);
        let t_four = parseInt(input4.value);
        let h_start;
        let h_end;
        let v_start;
        let v_end;

        //put input in correct order
        if(t_one <= t_two) {
            h_start = t_one;
            h_end = t_two;
        }
        else if(t_one > t_two){
            h_start = t_two;
            h_end = t_one;
        }
        if(t_three <= t_four){
            v_start = t_three;
            v_end = t_four;
        }else if(t_three > t_four) {
            v_start = t_four;
            v_end = t_three;
        }
        //flag used to help create table header
        let firstTime = true;

        //clear table
        table.innerHTML = "";
        tableDiv.style.overflowX = "hidden";
        tableDiv.style.overflowY = "hidden";

        //reset font size
        rules[1].style.fontSize = "1.2em";

        //create table header
        let thead = table.createTHead();
        let row = thead.insertRow();
        let text = "";
        for(let i = h_start - 1; i <=h_end; i++){
            let th = document.createElement("th");
            //create top left conner cell
            if(i === h_start - 1 && firstTime) {
                text = document.createTextNode("");
                firstTime = false;
            }else {
                text = document.createTextNode(i.toString());
            }

            th.appendChild(text);
            th.style.color = "yellow";
            th.style.backgroundColor = "black";
            th.style.fontSize = "1.2em";
            row.appendChild(th);
        }

        //generate rows
        for(let i = v_start, x = 0; i <= v_end ; i++, x++){
            let row = table.insertRow();
            let cell = row.insertCell();
            text = document.createTextNode(v_start + x);
            cell.appendChild(text);
            cell.style.backgroundColor = "black";
            cell.style.color = "white";

            //generate columns
            for(let y = h_start; y <= h_end; y++){
                cell = row.insertCell();
                text = document.createTextNode((i * y).toString());
                cell.appendChild(text);
            }
        }
        //resize table to fit elements
        resize();
        tableCreated = true;

        //make div visible
        tableDiv.style.visibility = "visible";
    }

    function resize(){
        //decrease font size of elements of table when the table overflows its div on the horizontal axis
        while(tableDiv.scrollWidth > tableDiv.clientWidth){
            let n = parseFloat(rules[1].style.fontSize);
            //limit how small the font size can be, and set it to scroll view after that point
            if(n <= .6){
                tableDiv.style.overflowX = "scroll";
                break;
            }
            rules[1].style.fontSize = (Number(n - .1).toFixed(2)).toString() + "em";
        }
        //once row reaches scroll height add scroll. I did this because I didnt like the space left for the scroll bar
        //even when the scroll bar didn't exist
        if(tableDiv.scrollHeight > tableDiv.clientHeight ) {
            tableDiv.style.overflowY = "scroll";
        }
        else {
            tableDiv.style.overflowY = "hidden";
        }
    }
});