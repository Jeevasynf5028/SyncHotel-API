var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as APICALLS from "./apicalls.js";
//getting elements by IDs
var box = document.getElementById("box");
const signIn = document.getElementById("signIn");
const signUp = document.getElementById("signUp");
var signInButton = document.getElementById("signInButton");
var signUpButton = document.getElementById("signUpButton");
const homePage = document.getElementById("homePage");
const menu = document.getElementById("menu");
const roomProfilePage = document.getElementById("RoomProfilePage");
const editRoomPage = document.getElementById("editRoom");
const addNewRoomPage = document.getElementById("addNewRoom");
const walletRechargePage = document.getElementById("walletRechargePage");
const takeRoomPage = document.getElementById("TakeRoomPage");
const userProfilePage = document.getElementById("UserProfilePage");
const customerCartItemsPage = document.getElementById("CustomerCartItemsPage");
const orderHistoryPage = document.getElementById("OrderHistoryPage");
const dateEdit = document.getElementById("dateEdit");
const dategetting = document.getElementById("dategetting");
var currentCustomer;
function displayNone() {
    box.style.display = "none";
    signIn.style.display = "none";
    signUp.style.display = "none";
    homePage.style.display = "none";
    addNewRoomPage.style.display = "none";
    editRoomPage.style.display = "none";
    walletRechargePage.style.display = "none";
    takeRoomPage.style.display = "none";
    roomProfilePage.style.display = "none";
    userProfilePage.style.display = "none";
    customerCartItemsPage.style.display = "none";
    dateEdit.style.display = "none";
    dategetting.style.display = "none";
    orderHistoryPage.style.display = "none";
    // menu.style.display="none";
}
function signUpPage() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        box.style.display = "block";
        signUp.style.display = "block";
        signInButton.style.background = "none";
        signUpButton.style.background = "rgb(247, 191, 113)";
    });
}
function signInPage() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        box.style.display = "block";
        signIn.style.display = "block";
        signInButton.style.background = "rgb(247, 191, 113)";
        signUpButton.style.background = "none";
    });
}
function submitForm(e) {
    return __awaiter(this, void 0, void 0, function* () {
        alert("inside the submit Form");
        e.preventDefault();
        var name = document.getElementById("userName").value;
        var mobile = document.getElementById("mobile").value;
        var aadhar = document.getElementById("aadhar").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password1").value;
        var address = document.getElementById("address").value;
        var gender = document.getElementById("gender").value;
        var foodtype = document.getElementById("foodType").value;
        var walletbalance = parseInt(document.getElementById("walletBalance").value);
        var isavail = yield APICALLS.CheckUser(email);
        if (!isavail) {
            let newUser = yield APICALLS.AddNewUser({ userID: "", userName: name, mobileNumber: mobile, email: email, userAadhar: aadhar, password: password, address: address, foodType: foodtype, walletBalance: walletbalance, gender: gender });
            //resetting form data
            document.getElementById("userName").value = "";
            document.getElementById("aadhar").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password1").value = "";
            document.getElementById("address").value = "";
            document.getElementById("gender").value = "";
            document.getElementById("foodType").value = "";
            (document.getElementById("walletBalance").value) = "";
            alert(`Registration Successfully.Your UserID is${newUser}`);
        }
        else {
            var signInBorder = document.getElementById("signUP");
            signInBorder.style.border = "2px solid red";
            alert('alrady exist');
        }
    });
}
////Sign In method
function signInSubmit(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        var email = document.getElementById("email1");
        var pass = document.getElementById("password2");
        if (!email.value || !pass.value) {
            alert("email and pass not be empty");
            return;
        }
        var user = yield APICALLS.GetIndividualUser(email.value, pass.value);
        if (user == null) {
            alert("invalid Email or password");
        }
        else {
            // alert("valid cutomer")
            currentCustomer = user;
            home();
            // alert("valid user")
            email.value = "";
            pass.value = "";
        }
    });
}
function home() {
    return __awaiter(this, void 0, void 0, function* () {
        // alert("inside the Home")
        displayNone();
        homePage.style.display = "block";
        menu.style.display = "block";
        var welcome = document.getElementById("welcome");
        welcome.innerHTML = "Welcome " + currentCustomer.userName;
    });
}
function NewRoomPage() {
    return __awaiter(this, void 0, void 0, function* () {
        addNewRoomPage.style.display = "block";
        editRoomPage.style.display = "none";
    });
}
function CustomerDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        userProfilePage.style.display = "block";
        document.getElementById('user-profile-card').innerHTML = `
    
    <table class="profile-table">
        <tr>
            <th>User ID</th> <td>${currentCustomer.userID}</td>
        </tr>
        <tr>
            <th>User Name</th>  <td>${currentCustomer.userName}</td>
        </tr>
        <tr>
            <th>Email</th>  <td>${currentCustomer.email}</td>
        </tr>
        <tr>
            <th>Gender</th>  <td>${currentCustomer.gender}</td>
        </tr>
        <tr>
            <th>Mobile Number</th>  <td>${currentCustomer.mobileNumber}</td>
        </tr>
        <tr>
            <th>FootType</th>  <td>${currentCustomer.foodType}</td>    
        </tr>
        <tr>
            <th>UserAadhar</th> <td>${currentCustomer.userAadhar}</td>
        </tr>
        <tr>
            <th>Wallet Balance</th> <td>${currentCustomer.walletBalance}</td>
        </tr>
    </table>
    `;
    });
}
function ShowRoomDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        roomProfilePage.style.display = "block";
        var rooms = yield APICALLS.FetchRooms();
        var roomTable = document.getElementById("room-table");
        roomTable.innerHTML = `
                <tr>
                    <th>Room ID</th> <th>Room Image</th> <th>RoomType</th>  <th>NumberOfBeds</th>  <th>PricePerDay</th> <th>Action</th>
                </tr>`;
        rooms.forEach(room => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <tr>
                <td>${room.roomID}</td>
                <td><img src="${room.roomImage}">Image</td>  
                <td>${room.roomType}</td> <td>${room.numberOfBeds}</td>
                <td>${room.pricePerDay}</td>
                <td>
                    <button onclick="editChosenRoom('${room.roomID}')">Edit</button>
                    <button onclick="deleteRoom('${room.roomID}')">Delete</button>
                </td>
                </tr> `;
            roomTable.appendChild(row);
        });
    });
}
var currentRoom;
function editChosenRoom(roomID) {
    return __awaiter(this, void 0, void 0, function* () {
        editRoomPage.style.display = "block";
        addNewRoomPage.style.display = "none";
        currentRoom = yield APICALLS.GetIndividualRoom(roomID);
        if (currentRoom != null) {
            document.getElementById("editroomType").value = currentRoom.roomType;
            document.getElementById("editroomNumberOfBeds").value = String(currentRoom.numberOfBeds);
            document.getElementById("editroomPrice").value = String(currentRoom.pricePerDay);
            document.getElementById("editroomPhoto").value = String(currentRoom.roomImage);
        }
        else {
            alert("Room not found");
        }
    });
}
function editRoom(e) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        if (currentRoom != null) {
            var RoomType = document.getElementById("editroomType").value;
            var NumberOfBeds = parseFloat(document.getElementById("editroomNumberOfBeds").value);
            var Price = parseFloat(document.getElementById("editroomPrice").value);
            var RoomPhoto = (_a = document.getElementById("editroomPhoto").files) === null || _a === void 0 ? void 0 : _a[0];
            let roomPhotoBase64 = "";
            if (RoomPhoto) {
                roomPhotoBase64 = yield convertToBase64(RoomPhoto); // Convert the image to Base64
            }
            yield APICALLS.EditRoomDetail({ roomID: currentRoom.roomID, roomType: RoomType, numberOfBeds: NumberOfBeds, pricePerDay: Price, roomImage: roomPhotoBase64 });
            alert("Room modified successfully.");
            //resetting values
            document.getElementById("editroomType").value = "";
            document.getElementById("editroomNumberOfBeds").value = "";
            document.getElementById("editroomPrice").value = "";
            document.getElementById("editroomPhoto").value = "";
            ShowRoomDetails();
        }
    });
}
function deleteRoom(roomID) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteRoom = confirm('Do you want to delete this room');
        if (deleteRoom) {
            yield APICALLS.DeleteRoomDetail(roomID);
        }
        ShowRoomDetails();
    });
}
function addRoom(e) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        var RoomType = document.getElementById("roomType").value;
        var NumberOfBeds = parseFloat(document.getElementById("roomNumberOfBeds").value);
        var Price = parseFloat(document.getElementById("roomPrice").value);
        var roomPhotoFile = (_a = document.getElementById("roomPhoto").files) === null || _a === void 0 ? void 0 : _a[0];
        let roomPhotoBase64 = "";
        if (roomPhotoFile) {
            roomPhotoBase64 = yield convertToBase64(roomPhotoFile); // Convert the image to Base64
        }
        let newRoom = yield APICALLS.AddNewRoom({ roomID: "", roomType: RoomType, numberOfBeds: NumberOfBeds, pricePerDay: Price, roomImage: roomPhotoBase64 });
        document.getElementById("roomType").value = "";
        document.getElementById("roomNumberOfBeds").value = "";
        document.getElementById("roomPrice").value = "";
        document.getElementById("roomPhoto").value = "";
        alert(`Room added successfully. Room ID is ${newRoom}`);
        ShowRoomDetails();
    });
}
//function for recharge
function deposit() {
    return __awaiter(this, void 0, void 0, function* () {
        alert("inside Deposit");
        var amount1 = document.getElementById("amount").value;
        yield APICALLS.RechargeWalletBalance(currentCustomer.userID, Number(amount1));
        var customer = yield APICALLS.GetIndividualUser(currentCustomer.email, currentCustomer.password);
        currentCustomer = customer; //update the customer object
        document.getElementById("amount").value = "";
        alert(`Recharge Successful. Your current balance is ${currentCustomer.walletBalance}`);
        RechargeWallet();
    });
}
//load page
//Wallet Recharge Page
function RechargeWallet() {
    displayNone();
    walletRechargePage.style.display = "block";
    document.getElementById("currentBalance").innerHTML = `Available Balance : ${currentCustomer.walletBalance}`;
}
function convertToBase64(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });
}
function LogOut() {
    return __awaiter(this, void 0, void 0, function* () {
        alert("inside the Log out");
        displayNone();
        box.style.display = "block";
        signIn.style.display = "block";
        menu.style.display = "none";
    });
}
const roomContainer = document.getElementById('room-container');
function displayRooms(rooms) {
    rooms.forEach(room => {
        //create div to add the datas from the api
        const roomDiv = document.createElement('div');
        roomDiv.className = 'room';
        // Create room name
        const roomID = document.createElement('h2');
        roomID.textContent = room.roomID;
        roomDiv.appendChild(roomID);
        // Create image
        const roomImage = document.createElement('img');
        roomImage.src = room.roomImage;
        roomImage.alt = room.roomID;
        roomDiv.appendChild(roomImage);
        // Create room details  price
        const roomPrice = document.createElement('p');
        roomPrice.textContent = ` Price: ${room.pricePerDay}`;
        roomDiv.appendChild(roomPrice);
        // Create button
        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        roomDiv.appendChild(button);
        button.onclick = function () {
            AddToCart(room.roomID);
        };
        // Append to the container
        roomContainer.appendChild(roomDiv); //parent container
    });
}
//user wish to add
function AddToCart(roomID) {
    return __awaiter(this, void 0, void 0, function* () {
        var fromDate = document.getElementById("fromDate");
        var dateSplit = fromDate.value.split("-");
        var toDate = document.getElementById("toDate");
        var dateSplit2 = toDate.value.split("-");
        var formDateInput = new Date(Number(dateSplit[0]), (Number(dateSplit[1]) - 1), Number(dateSplit[2]));
        var toDateInput = new Date(Number(dateSplit2[0]), (Number(dateSplit2[1]) - 1), Number(dateSplit2[2]));
        var selectedRoom = yield APICALLS.GetIndividualRoom(roomID);
        if (selectedRoom != null) {
            var cartID = yield APICALLS.AddItemToCart({ wishListID: "", userID: currentCustomer.userID, roomID: selectedRoom.roomID, fromDate: formDateInput, toDate: toDateInput, priceOfRoom: selectedRoom.pricePerDay });
            alert(`${selectedRoom.roomID} added to cart list . Your CartID is ${cartID}`);
        }
        TakeRoom();
    });
}
const cartItemContainer = document.getElementById('cart-item-div');
const purchaseAllButton = document.getElementById("new-order-btn");
const totalPriceText = document.getElementById("showTotalPrice");
const emptyCartDiv = document.getElementById("empty-cart");
//function for taking rooms
function CartItems() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        customerCartItemsPage.style.display = "block";
        var orders = yield APICALLS.FetchCarts(currentCustomer.userID);
        cartItemContainer.innerHTML = '';
        emptyCartDiv.innerHTML = '';
        displayCartItems(orders);
    });
}
function DeleteTempCartDetail(cartID) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteProduct = confirm('Do you want to delete this cart');
        if (deleteProduct) {
            yield APICALLS.DeleteCartDetail(currentCustomer.userID, cartID);
            alert("Order deleted successfully.");
            CartItems();
        }
    });
}
var currentCart;
function ModifyCartCount(cartID) {
    return __awaiter(this, void 0, void 0, function* () {
        var editCart = document.getElementById("dateEdit");
        // editCart.style.display="block";
        currentCart = yield APICALLS.FetchOneCart(cartID);
        var fromDate = document.getElementById("fromDateEdit");
        var dateSplit = fromDate.value.split("-");
        var toDate = document.getElementById("toDateEdit");
        var dateSplit2 = toDate.value.split("-");
        var formDateInput = new Date(Number(dateSplit[0]), (Number(dateSplit[1]) - 1), Number(dateSplit[2]));
        var toDateInput = new Date(Number(dateSplit2[0]), (Number(dateSplit2[1]) - 1), Number(dateSplit2[2]));
        currentCart.fromDate = formDateInput;
        currentCart.toDate = toDateInput;
        yield APICALLS.UpdateCartData(currentCart);
        alert('cart Modified Successfully.');
        // editCart.style.display="none";
        CartItems();
    });
}
function BuySingleCartItem(cartID) {
    return __awaiter(this, void 0, void 0, function* () {
        var orderConfirmation = yield APICALLS.BuySingleItem(cartID, currentCustomer.userID);
        currentCustomer = (yield APICALLS.GetIndividualUser(currentCustomer.email, currentCustomer.password));
        alert(orderConfirmation);
        //deleteing the added cart items
        yield APICALLS.DeleteCartDetail(currentCustomer.userID, cartID);
        CartItems();
    });
}
function displayCartItems(carts) {
    return __awaiter(this, void 0, void 0, function* () {
        var totalPrice = 0;
        const emptyCart = document.createElement('h2');
        if (carts.length == 0) {
            //is len is 0 then no item present
            emptyCart.textContent = 'Cart Wish List is Empty';
            emptyCart.className = 'empty';
            purchaseAllButton.style.display = "none";
            totalPriceText.style.display = "none";
            emptyCartDiv.appendChild(emptyCart);
        }
        else {
            //else show the details
            emptyCartDiv.innerHTML = '';
            emptyCart.textContent = '';
            // purchaseAllButton.style.display = "block";
            totalPriceText.style.display = "block";
            dateEdit.style.display = "block";
            //traverse the cards
            for (const cart of carts) {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart';
                var room = yield APICALLS.GetIndividualRoom(cart.roomID);
                //get product is present or not
                if (room != null) {
                    //is not null generate the html
                    const imageDiv = document.createElement('div');
                    imageDiv.className = 'cart-div';
                    const roomImage = document.createElement('img');
                    roomImage.src = room.roomImage;
                    roomImage.alt = room.roomType;
                    imageDiv.appendChild(roomImage);
                    cartItemDiv.appendChild(imageDiv);
                    const detailsDiv = document.createElement('div');
                    detailsDiv.className = 'cart-div';
                    const roomType = document.createElement('h2');
                    const roomBed = document.createElement('p');
                    const roomPrice = document.createElement('p');
                    const fromDate = document.createElement('p');
                    const toDate = document.createElement('p');
                    roomType.textContent = `RoomType: ${room.roomType}`;
                    roomBed.textContent = `Room Bed COUNT: ${room.numberOfBeds}`;
                    roomPrice.textContent = `Room Price PerDay: ${room.pricePerDay}`;
                    // fromDate.textContent = cart.fromDate.toLocaleString();
                    fromDate.textContent = `From Date of Booking: ${cart.fromDate}`;
                    // toDate.textContent = cart.toDate.toLocaleString();
                    toDate.textContent = `To Date of Booking: ${cart.toDate}`;
                    // roomType.textContent = room.roomType;
                    roomPrice.textContent = `Price of Room ONly: $${cart.priceOfRoom}`;
                    detailsDiv.appendChild(roomType);
                    detailsDiv.appendChild(fromDate);
                    detailsDiv.appendChild(toDate);
                    detailsDiv.appendChild(roomBed);
                    detailsDiv.appendChild(roomPrice);
                    const modifyButton = document.createElement('button');
                    modifyButton.textContent = 'Modify';
                    modifyButton.onclick = () => {
                        ModifyCartCount(cart.wishListID); //call the modify the cart
                    };
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = () => {
                        DeleteTempCartDetail(cart.wishListID); //call the delete
                    };
                    const outOfStock = document.createElement('p');
                    const PriceOfCart = document.createElement('p');
                    const buyButton = document.createElement('button');
                    buyButton.textContent = 'BOOK RooM';
                    buyButton.disabled = false;
                    buyButton.style.backgroundColor = "#28a745";
                    buyButton.style.cursor = 'allowed';
                    var fromDataCart = new Date(cart.fromDate);
                    var toDateCart = new Date(cart.toDate);
                    let diff = Math.abs(toDateCart.getTime() - fromDataCart.getTime());
                    let timevalue = diff / (1000 * 60 * 60 * 24);
                    totalPrice = totalPrice + (timevalue * cart.priceOfRoom);
                    PriceOfCart.textContent = `Price of This Cart Alone: $${timevalue * cart.priceOfRoom}`;
                    outOfStock.textContent = '';
                    detailsDiv.appendChild(buyButton);
                    buyButton.onclick = () => {
                        BuySingleCartItem(cart.wishListID); //call the buyfunction
                    };
                    detailsDiv.appendChild(modifyButton); //adding the button
                    detailsDiv.appendChild(deleteButton); //adding the button
                    detailsDiv.appendChild(PriceOfCart); // label to denote
                    cartItemDiv.appendChild(detailsDiv);
                    cartItemContainer.appendChild(cartItemDiv); //add cart one by one
                }
            }
        }
        // totalPriceText.innerHTML = `Total Price: $${totalPrice}`;
    });
}
function TakeRoom() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        takeRoomPage.style.display = "block";
        dategetting.style.display = "block";
        var rooms = yield APICALLS.FetchRooms();
        roomContainer.innerHTML = '';
        displayRooms(rooms);
    });
}
const billContentDiv = document.getElementById('bill-content');
function OrderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        orderHistoryPage.style.display = "block";
        billContentDiv.innerHTML = '';
        var bookings = yield APICALLS.FetchAllBookings(currentCustomer.userID);
        var bookingTable = document.getElementById("booking-table");
        if (bookings.length == 0) {
            bookingTable.innerHTML = '';
            const emptyCart = document.createElement('h2');
            emptyCart.textContent = 'No Bookings Found';
            emptyCart.className = 'empty';
            billContentDiv.appendChild(emptyCart);
        }
        else {
            bookingTable.innerHTML = `
                <tr>
                    <th>Booking ID</th>  <th>Total Price</th> <th>Date Of Booking</th> <th>Booking Status</th> 
                </tr>
    `;
            bookings.forEach(booking => {
                const row = document.createElement('tr');
                if (booking.bookingStatus == "Booked") {
                    row.innerHTML = `
                <tr>
                    <td>${booking.bookingID}</td> <td>${booking.totalPrice}</td> <td>${booking.dateofBooking}</td> <td>${booking.bookingStatus}</td>
                    <td>
                        <button onclick="CancelBookingItem('${booking.bookingID}')">Cancel Cooking</button>
                    </td>
                </tr>
        `;
                    bookingTable.appendChild(row);
                }
                else {
                    row.innerHTML = `
                <tr>
                    <td>${booking.bookingID}</td> <td>${booking.totalPrice}</td> <td>${booking.dateofBooking}</td> <td>${booking.bookingStatus}</td>
                    <td>
                        <button onclick="CancelBookingItem('${booking.bookingID}')" style="background-color: rgb(211, 69, 30);" disabled>Cancel Cooking</button>
                    </td>
                </tr>
        `;
                    bookingTable.appendChild(row);
                }
            });
        }
    });
}
function CancelBookingItem(bookingID) {
    return __awaiter(this, void 0, void 0, function* () {
        var responseItem = yield APICALLS.CancelBooking(bookingID);
        alert(responseItem);
        OrderHistory(); //refreshing
    });
}
const functions = Object.assign({ signInPage, signUpPage, displayNone, submitForm, signInSubmit, home, CustomerDetails, ShowRoomDetails, editChosenRoom, editRoom, deleteRoom, addRoom, NewRoomPage, deposit, RechargeWallet, LogOut, TakeRoom, AddToCart, CartItems, displayCartItems, DeleteTempCartDetail, BuySingleCartItem, OrderHistory, CancelBookingItem }, APICALLS);
Object.assign(window, functions);
