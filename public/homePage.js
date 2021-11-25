let logout = new LogoutButton;
logout.action = () => {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		}
	});
};

//Информация о пользователе 

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
getStocks();
setInterval(getStocks, 60000);


//Операции с деньгами
let moneyManager = new MoneyManager;


//Пополнить баланс
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'Ваш баланс пополнен успешно');
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
}


//Конвертация
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, response => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Ковертация выполнена успешно");
    } else {
      moneyManager.setMessage(response.success, response.error);
    } 
  });
}


//Переводы
moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Перевод осуществлен");
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
}


//Избранное
let favoritesWidget = new FavoritesWidget;
ApiConnector.getFavorites((response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
})


//Добавление в избранное
favoritesWidget.addUserCallback = ((data) => {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, "Пользователь добавлен");
		} else {
			favoritesWidget.setMessage(response.success, response.error);
		}
	});
});


//Удаление из избранного
favoritesWidget.removeUserCallback = ((data) => {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, "Пользователь удалён");
		} else {
			favoritesWidget.setMessage(response.success, response.error);
		}
	});
});
