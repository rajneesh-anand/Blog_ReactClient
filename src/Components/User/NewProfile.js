import React, { Component } from "react";

import ProfDetails from "./ProfDetails";

// import themeObject from "../../utils/theme";

// const theme = createMuiTheme(themeObject);

class NewProfile extends Component {
	render() {
		return (
			// <MuiThemeProvider theme={theme}>
			<ProfDetails />
			// </MuiThemeProvider>
		);
	}
}

export default NewProfile;
