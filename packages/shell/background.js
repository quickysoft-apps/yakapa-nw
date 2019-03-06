const tray = new nw.Tray({ title: 'Tray', icon: 'assets/pd.png' });
const menu = new nw.Menu();
menu.append(new nw.MenuItem({ type: 'checkbox', label: 'box1' }));
tray.menu = menu;
