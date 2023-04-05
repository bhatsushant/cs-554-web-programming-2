import '../styles/Button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    danger: 'danger',
    inverted: 'inverted',
    black: 'button-black'
}

const Button = ({children, buttonType, ...otherProps}) => {
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;