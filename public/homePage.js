// выход из кабинета

let logout = new LogoutButton;
logout.action = () => {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		}
	});
};

//информация о пользователе 

ApiConnector.current((response) => {
  if(response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

// Текущие курсы валют
let ratesBoard = new RatesBoard;
function getStocks() {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	})
}


// Операции с деньгами
let moneyManager = new MoneyManager;

// Пополнить баланс
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'Ваш баланс пополнен успешно');
		} else {
			moneyManager.setMessage(response.error);
		}
	});
}
