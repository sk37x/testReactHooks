import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	containerNotCenter: {
		flex: 1,
		margin: 24,
	},
	containerLogin: {
		flex: 1,
		margin: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 36,
		marginBottom: 16,
	},
	title2: {
		fontSize: 20,
		marginBottom: 16,
	},
	androidButtonText: {
		color: "blue",
		fontSize: 20,
	},
	btn: {
		width: "95%",
		marginVertical: 9,
	},
	signIn: {
		marginVertical: 12,
		width: "95%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	scrollContainer: {
		flex: 1,
		paddingHorizontal: 15,
	},
	scrollContentContainer: {
		paddingTop: 40,
		paddingBottom: 10,
	},
	imgFullScreen: {
		width: "100%",
		height: 200
	}
});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});