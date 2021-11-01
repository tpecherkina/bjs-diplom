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
