This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
// HÔM nay bắt đầu viết . từ video thứ 53:

=================================================================-
#1. Lỗi hôm nay cần phải chú ý đó là lỗi giao diện có cả login logout . lí do đó là tại file app.js , chúng ta để : 
<!-- {this.props.isLoggedIn && <Header />}  --> $1 -->
                        {/* nếu loggin thì render header */}
                        <!-- <div className="content-container">
                        <CustomScrollbars style={{height : '100vh', width : '100%'}}>
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} /> $3
                                <Route path={path.HOMEPAGE} component={HomePage} /> $2
                            </Switch>
                            </CustomScrollbars> -->

#=> Tại $1, nếu loggin thành công thì sẽ cho xuát hiện header(header màu xanh để login và logout) , mà tại vị trí $2 thì render ra homepage. nếu ta đăng nhập thành công, lúc đó thông tin đăng nhập được lưu lại . header sẽ xuất hiện ( để login và logout).
cùng lúc đó chạy cả homepage nên xuất hiện tình trạng chúng cùng xuất hiện .

// để giải quyết tình trạng này . login <!-- {this.props.isLoggedIn && <Header />}  --> sẽ được đưa vào 
component SYstem tại $3, viết code trong routes/system.js .
->  trong system . đầu tiên ta import Header Component , tiếp đến chúng ta sử dụng redux để lưu giữ isLoggedIn : state.user.isLoggedIn
Khi đã lấy được isLoggedIn === true or false , chúng ta sẽ trích xuất tại một biến tạm tại render , và sử dụng nó để thêm vào điều kiện
xuất hiện - true thì xuất hiện header, ko thì thôi , nó sẽ hiện lên login và bắt đăng nhập đấy . 

thông tin nào muốn lưu trên react , để khi reload lại nó vẫn còn thông tin đó thì ta phải persit nó . 


=================================================================-
#2. 54: Redux 
- trước hết tải npm redux persist 

=================================================================-
#2. 56: 
Đầu tiên là làm cách nào để load được data allcodes lên trên component .
=> Ta sử dụng gọi api để thực hiện điều đó. 
Khi gọi api , ta viết nó trong Didmount và truyền vào đó 1 tham số định danh cho allcodes , ví dụ position hoặc gender ...
Khi lấy được dữ liệu trả về , dữ liệu được gọi dưới dạng 1 đối tượng có 3 tham số là errCode , message và allcodes . 
Ta dùng allcodes để truyền dữ liệu tràn vào các thành phần nào cần nó để hiển thị , ví dụ các drop-down hoặc selected-option
Đặt điều kiện khi có res và res.errCode === 0 , ta mới thay đổi state.genderArrr theo dữ liệu allcodes đã được lấy 
Có được allcodes.vd-gender , ta dùng Fomatted để trình bày nó , và nhớ cấu hình trong vi.json và en.json
Tuy nhiên, kể cả khi có như vậy thì chúng ta vẫn chưa thể thay đổi thành phần trong một select , lí do là bởi ko có cách nào đả động và xét điều kiện xem nó hiển thị ra tiếng anh hay tieiensg việt . 
Lúc này chúng ta dùng redux để xem xem toàn bộ componet này sử dụng language nào , từ đó check điều kiện để thay đổi ngôn ngữ :

<!-- let genders = this.state.genderArr; -->
 <!-- <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className='form-control'>
                                    {genders && genders.length > 0 &&
                                    genders.map((item, index)=>{
                                        return (
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        );
                                    })}
                                </select> -->
---









