import { StyleSheet } from 'react-native';


export const Colors = {
    primaryColor: '#281e6e',
    secondaryColor: '#f5730f',
    black: '#000000',
    white: '#FFFFFF',
    grey: '#808080',
    lightGrey: '#cccccc',
    gray55 : '#8c8c8c',
    green: '#008000',
    red: '#ff0000',
    flesh: '#f8c5ba'
}

export default StyleSheet.create({
    justifyContent: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_style_one: {
        fontSize: 15,
        color: Colors.black
    },
    text_style_two: {
        fontSize: 15,
        color: Colors.primaryColor
    },
    text_style_three: {
        fontSize: 18,
        color: Colors.black
    },
    text_Topic_style: {
        color: '#000000',
        fontSize: 15,
    },
    text_normal_style: {
        color: '#000000',
        fontSize: 12,
    },
    text_normal_style_two: {
        color: '#000000',
        fontSize: 15,
    },
    paddingTop_bottom: {
        paddingTop: 10,
        paddingBottom: 10
    },
    paddingBottom: {
        paddingBottom: 10
    },
    input_filed: {
        borderRadius: 10,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.grey,
        paddingLeft: 10,
        color: Colors.black
    },
    rupees_text: {
        color: Colors.black, 
        fontSize: 15 
    },
    flex_row_space_between: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    flex_row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    horizontal_line: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.black,
    },
    vertical_line: {
        height: '100%',
        width: 1,
        backgroundColor: Colors.black,
    },
    save_button: {
        color: Colors.white,
        fontSize: 17,
        fontWeight: '500'
    },
    drop_down_selected_text_style: {
        fontSize: 16,
        color: 'black'
    },
    drop_down_icon_style: {
        width: 20,
        height: 20,
    },
});


