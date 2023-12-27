import './Header.css'

const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
const Header = () => {
    return (
        <div className='Header'>
            <h3>오늘은 📆</h3>
            <h1>{new Date().toLocaleDateString("ko-KR", options)}</h1>
        </div>
    );
};

export default Header;