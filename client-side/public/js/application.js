$(document).ready(function() {

  searchBarAutocomplete();
  eventListeners();

});

function searchBarAutocomplete() {
  $(".search-params#origin").autocomplete({
    source: function(request, response){
      var searchTerm = request.term.toLowerCase();
      var ret = [];
      $.each(source, function(i, airportItem){
        if (airportItem.code.toLowerCase().indexOf(searchTerm) !== -1 || airportItem.name.toLowerCase().indexOf(searchTerm) === 0) {
          ret.push(airportItem.name + ' (' + airportItem.code + ')');
        }
      });
      response(ret);
    }
  });
}

function eventListeners() {
  console.log("in eventListeners")

  $(".button#submit").on("click", function(event) {
    event.preventDefault();
    console.log("in .button#submit on click");

    var origin = $("#origin").val();
    var budget = $("#budget").val();
    var depDate = $("#dep-date").val();
    var retDate = $("#ret-date").val();

    // uncomment below in order to make ajax post request
    // leads to replaceSearchBox and populateResultsTemp
    // add retDate
    submitRequest(origin, budget, depDate, retDate);

    // to test fade in and fade out
    // replaceSearchBox();

    // to test handlebars template
    //LEGIT FLIGHT!!!
    // var data = [
    //   {"index": 0, "budget": "80", "carrier": "Virgin America", "carrier_code": "VX", "flight_number" :"906", "depart_time" :"2015-03-23", "origin":"SFO" , "arrival_time":"2015-03-27" , "destination":"LAS" },
    //   {"index": 1, "budget": "1800", "carrier": "United Airlines", "carrier_code": "UA", "flight_number" :"990", "depart_time" :"2015-03-13", "origin":"SFO" , "arrival_time":"2015-03-27" , "destination":"CDG"},
    //   {"index": 2, "budget": "900", "carrier": "United Airlines", "carrier_code": "UA", "flight_number" :"837", "depart_time": "2015-03-16", "origin":"SFO" , "arrival_time":"2015-03-18" , "destination":"NRT"}
    // ];
    // populateResultsTemp(data, retDate);
  }); //end of on click
}

function submitRequest(origin, budget, depDate, retDate) {
  console.log("in submitRequest");

  $.ajax({
    url: "http://localhost:3000/index",
    type: "POST",
    dataType: "json",
    data: {"origin": origin, "depart_time": depDate, "sale_total": budget}
  })
  .done(function(data) {
    console.log("success");
    console.log(data);
    replaceSearchBox();
    populateResultsTemp(data, retDate);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

} //end of submitRequest

// called in submitRequest callback when successful
function replaceSearchBox() {
  console.log("in replaceSearchBox");

  // fadeOut
  $(".search-bar-wrapper").animate({ opacity:0 }, fadeInTextBox());

  //fadein
  function fadeInTextBox() {
    $(".result-text").fadeIn("4000");
  }
}

// called in submitRequest callback when successful
function populateResultsTemp(data, retDate) {
  console.log("in populateResultsTemp");
  console.log(retDate+"***********");
  console.log(data);

  var source = $("#results-template").html();
  var template = Handlebars.compile(source);
  var context = data;

  console.log(template(context));
  $(".results-wrapper").html(template(context));

  // directs on "click" event listener to redirect user to googleflights ticket purchse
  redirectToPurchase(data, retDate);
}

function redirectToPurchase(data, retDate) {
  $(".button#purchase").on("click", function(event) {
    event.preventDefault();

    console.log('in redirectToPurchase');
    console.log(retDate+"***********");

    // grab data attribute value of button that was clicked
    var indexString = $(this).attr("data");
    var index = parseInt(indexString);

    var purchaseLink = "https://www.google.com/flights/#search;f="+data[index].origin+";t="+data[index].destination+";d="+data[index].depart_time+";r="+retDate+";sel="+data[index].origin+data[index].destination+"0"+data[index].carrier_code+""+data[index].flight_number+";mp="+data[index].budget;

    console.log(purchaseLink);

    window.open(purchaseLink);
  });
}

var source =[{ name: ' ATLANTA GA, US', code: 'ATL' },{ name: ' BEIJING, CN', code: 'PEK' },{ name: ' LONDON, GB', code: 'LHR' },{ name: ' CHICAGO IL, US', code: 'ORD' },{ name: ' TOKYO, JP', code: 'HND' },{ name: ' LOS ANGELES CA, US', code: 'LAX' },{ name: ' PARIS, FR', code: 'CDG' },{ name: ' DALLAS/FORT WORTH TX, US', code: 'DFW' },{ name: ' FRANKFURT, DE', code: 'FRA' },{ name: ' HONG KONG, HK', code: 'HKG' },{ name: ' DENVER CO, US', code: 'DEN' },{ name: ' DUBAI, AE', code: 'DXB' },{ name: ' JAKARTA, ID', code: 'CGK' },{ name: ' AMSTERDAM, NL', code: 'AMS' },{ name: ' MADRID, ES', code: 'MAD' },{ name: ' BANGKOK, TH', code: 'BKK' },{ name: ' NEW YORK NY, US', code: 'JFK' },{ name: ' SINGAPORE, SG', code: 'SIN' },{ name: ' GUANGZHOU, CN', code: 'CAN' },{ name: ' LAS VEGAS NV, US', code: 'LAS' },{ name: ' SHANGHAI, CN', code: 'PVG' },{ name: ' SAN FRANCISCO CA, US', code: 'SFO' },{ name: ' PHOENIX AZ, US', code: 'PHX' },{ name: ' HOUSTON TX, US', code: 'IAH' },{ name: ' CHARLOTTE NC, US', code: 'CLT' },{ name: ' MIAMI FL, US', code: 'MIA' },{ name: ' MUNICH, DE', code: 'MUC' },{ name: ' KUALA LUMPUR, MY', code: 'KUL' },{ name: ' ROME, IT', code: 'FCO' },{ name: ' ISTANBUL, TR', code: 'IST' },{ name: ' SYDNEY, AU', code: 'SYD' },{ name: ' ORLANDO FL, US', code: 'MCO' },{ name: ' INCHEON, KR', code: 'ICN' },{ name: ' NEW DELHI, IN', code: 'DEL' },{ name: ' BARCELONA, ES', code: 'BCN' },{ name: ' LONDON, GB', code: 'LGW' },{ name: ' NEWARK NJ, US', code: 'EWR' },{ name: ' TORONTO ON, CA', code: 'YYZ' },{ name: ' SHANGHAI, CN', code: 'SHA' },{ name: ' MINNEAPOLIS MN, US', code: 'MSP' },{ name: ' SEATTLE WA, US', code: 'SEA' },{ name: ' DETROIT MI, US', code: 'DTW' },{ name: ' PHILADELPHIA PA, US', code: 'PHL' },{ name: ' MUMBAI, IN', code: 'BOM' },{ name: ' SÃO PAULO, BR', code: 'GRU' },{ name: ' MANILA, PH', code: 'MNL' },{ name: ' CHENGDU, CN', code: 'CTU' },{ name: ' BOSTON MA, US', code: 'BOS' },{ name: ' SHENZHEN, CN', code: 'SZX' },{ name: ' MELBOURNE, AU', code: 'MEL' },{ name: ' TOKYO, JP', code: 'NRT' },{ name: ' PARIS, FR', code: 'ORY' },{ name: ' MEXICO CITY, MX', code: 'MEX' },{ name: ' MOSCOW, RU', code: 'DME' },{ name: ' ANTALYA, TR', code: 'AYT' },{ name: ' TAIPEI, TW', code: 'TPE' },{ name: ' ZURICH, CH', code: 'ZRH' },{ name: ' NEW YORK NY, US', code: 'LGA' },{ name: ' FORT LAUDERDALE, FL, US', code: 'FLL' },{ name: ' WASHINGTON, DC, US', code: 'IAD' },{ name: ' PALMA DE MALLORCA, ES', code: 'PMI' },{ name: ' COPENHAGEN, DK', code: 'CPH' },{ name: ' MOSCOW, RU', code: 'SVO' },{ name: ' BALTIMORE MD, US', code: 'BWI' },{ name: ' KUNMING, CN', code: 'KMG' },{ name: ' VIENNA, AT', code: 'VIE' },{ name: ' OSLO, NO', code: 'OSL' },{ name: ' JEDDAH, SA', code: 'JED' },{ name: ' BRISBANE, AU', code: 'BNE' },{ name: ' SALT LAKE CITY UT, US', code: 'SLC' },{ name: ' DÜSSELDORF, DE', code: 'DUS' },{ name: ' BOGOTA, CO', code: 'BOG' },{ name: ' MILAN, IT', code: 'MXP' },{ name: ' JOHANNESBURG, ZA', code: 'JNB' },{ name: ' STOCKHOLM, SE', code: 'ARN' },{ name: ' MANCHESTER, GB', code: 'MAN' },{ name: ' CHICAGO IL, US', code: 'MDW' },{ name: ' WASHINGTON DC, US', code: 'DCA' },{ name: ' BRUSSELS, BE', code: 'BRU' },{ name: ' DUBLIN, IE', code: 'DUB' },{ name: ' SEOUL, KR', code: 'GMP' },{ name: ' DOHA, QA', code: 'DOH' },{ name: ' LONDON, GB', code: 'STN' },{ name: ' HANGZHOU, CN', code: 'HGH' },{ name: ' JEJU, KR', code: 'CJU' },{ name: ' VANCOUVER BC, CA', code: 'YVR' },{ name: ' BERLIN, DE', code: 'TXL' },{ name: ' SAN DIEGO CA, US', code: 'SAN' },{ name: ' TAMPA FL, US', code: 'TPA' },{ name: ' SÃO PAULO, BR', code: 'CGH' },{ name: ' BRASILIA, BR', code: 'BSB' },{ name: ' SAPPORO, JP', code: 'CTS' },{ name: ' XIAMEN, CN', code: 'XMN' },{ name: ' RIYADH, SA', code: 'RUH' },{ name: ' FUKUOKA, JP', code: 'FUK' },{ name: ' RIO DE JANEIRO, BR', code: 'GIG' },{ name: ' HELSINKI, FI', code: 'HEL' },{ name: ' LISBON, PT', code: 'LIS' },{ name: ' ATHENS, GR', code: 'ATH' },{ name: ' AUCKLAND, NZ', code: 'AKL' }];
