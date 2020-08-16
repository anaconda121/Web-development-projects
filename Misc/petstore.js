function calculateFoodOrder(numAnimals, avgFood) {
    var foodOrder = numAnimals * avgFood;
    if(numAnimals <= 0 || numAnimals == NaN || avgFood <= 0 || avgFood == NaN){
        foodOrder = -1;
    }
    return foodOrder;
}
document.write("Total Kilograms of Food that need to be ordered for next week: "+calculateFoodOrder(50,3));

function mostPopularDays(week) {
    var days = ['monday', 'tuesday','wednesday','thursday','friday','saturday','sunday'];
    var largest = 0;
    var largestDays = [];

    if(week.length == 7) {
        for(var i = 0; i < week.length; i++){
            if(week[i] > largest){
                largest = week[i];
                largestDays = [];
                largestDays.push(days[i]);
            }else if (week[i] == largest){
                largestDays.push(days[i]);
            }
        }
    }
    return [largest, largestDays];
}
document.write("<br> Most Popular and Least Popular days of the week: "+mostPopularDays([1,43,3,23,3,1,43])+" ");

var name = new Array(5);
var type = new Array(5);
var breed = new Array(5);
function createAnimalObjects(name,type,breed) {    
    if(name.length > 5||type.length > 5|| breed.length > 5 || name.length != type.length || name.length != breed.length 
        || name.length < 0 || type.length < 0 || breed.length < 0 || name.length == null || type.length < 0 || breed.length < 0 ){
        name = null;
        type = null;
        breed = null;
    }
    return[name, type, breed];
}
document.write("<br> Name, Type and Breed of Dog: "+createAnimalObjects(["Harry,Bob,George,Timmy,Alan,Sam"],["Dog,Cat,Fish,Dog,Cat,Monkey"],["Maltese,Siamese,Goldfish,Golden Retriever,Siamese,monki"]));
/**
 * A prototype to create Weekday objects
 */
function Weekday (name, traffic) {
    this.name = name;
    this.traffic = traffic;
}

/**
 * A prototype to create Item objects
 */
function Item (name, barcode, sellingPrice, buyingPrice) {
     this.name = name;
     this.barcode = barcode;
     this.sellingPrice = sellingPrice;
     this.buyingPrice = buyingPrice;
}
 /**
  * A prototype to create Animal objects
  */
function Animal (name, type, breed) {
    this.name = name;
     this.type = type;
     this.breed = breed;
}

