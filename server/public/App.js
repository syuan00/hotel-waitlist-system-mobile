"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function FreeSlots(props) {
  return /*#__PURE__*/React.createElement("div", null, props.showFreeSlots ? /*#__PURE__*/React.createElement("span", {
    id: "cnt"
  }, 25 - props.cnt, "/25 free slots ") : null, /*#__PURE__*/React.createElement("input", {
    id: "ShowFreeSlots",
    type: "submit",
    value: props.showFreeSlots ? "Hide" : "Show #Free Slots",
    onClick: props.changeShowFreeSlots
  }));
}

var HomePage = /*#__PURE__*/function (_React$Component) {
  _inherits(HomePage, _React$Component);

  var _super = _createSuper(HomePage);

  function HomePage() {
    _classCallCheck(this, HomePage);

    return _super.apply(this, arguments);
  }

  _createClass(HomePage, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "HomePage"
      }, /*#__PURE__*/React.createElement("img", {
        src: "hc_2.jpg",
        alt: "https://cdn.dribbble.com/users/165280/screenshots/3717720/attachments/833673/hc_2.jpg",
        width: "50%"
      }), /*#__PURE__*/React.createElement("h1", null, "Hotel California Wait List"), /*#__PURE__*/React.createElement(FreeSlots, {
        cnt: this.props.cnt,
        showFreeSlots: this.props.showFreeSlots,
        changeShowFreeSlots: this.props.changeShowFreeSlots
      }));
    }
  }]);

  return HomePage;
}(React.Component);

function CustomerRow(props) {
  var customer = props.customer;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, customer.id), /*#__PURE__*/React.createElement("td", null, customer.name), /*#__PURE__*/React.createElement("td", null, customer.phone), /*#__PURE__*/React.createElement("td", null, customer.timestamp.toDateString()));
}

function CustomerTable(props) {
  var customerRows = props.customers.map(function (customer) {
    return /*#__PURE__*/React.createElement(CustomerRow, {
      key: customer.id,
      customer: customer
    });
  });
  return /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Serial No."), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Phone Number"), /*#__PURE__*/React.createElement("th", null, "Timestamp"))), /*#__PURE__*/React.createElement("tbody", null, customerRows));
}

var CustomerAdd = /*#__PURE__*/function (_React$Component2) {
  _inherits(CustomerAdd, _React$Component2);

  var _super2 = _createSuper(CustomerAdd);

  function CustomerAdd() {
    var _this;

    _classCallCheck(this, CustomerAdd);

    _this = _super2.call(this);
    _this.handleAdd = _this.handleAdd.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CustomerAdd, [{
    key: "handleAdd",
    value: function handleAdd(e) {
      e.preventDefault();
      var form = document.forms.customerAdd;
      var customer = {
        name: form.name.value,
        phone: form.phone.value
      };
      this.props.createCustomer(customer);
      form.name.value = "";
      form.phone.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "customerAdd",
        onSubmit: this.handleAdd
      }, "Name: ", /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholer: "Enter customer name"
      }), /*#__PURE__*/React.createElement("span", null, " "), "Phone Number: ", /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "phone",
        placeholer: "Enter contact number"
      }), /*#__PURE__*/React.createElement("span", null, " "), /*#__PURE__*/React.createElement("button", {
        id: "addBtn"
      }, "Add"));
    }
  }]);

  return CustomerAdd;
}(React.Component);

var CustomerDelete = /*#__PURE__*/function (_React$Component3) {
  _inherits(CustomerDelete, _React$Component3);

  var _super3 = _createSuper(CustomerDelete);

  function CustomerDelete() {
    var _this2;

    _classCallCheck(this, CustomerDelete);

    _this2 = _super3.call(this);
    _this2.handleDelete = _this2.handleDelete.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(CustomerDelete, [{
    key: "handleDelete",
    value: function handleDelete(e) {
      e.preventDefault();
      var form = document.forms.customerDelete;
      var id = Number(form.id.value);
      this.props.deleteCustomer(id);
      form.id.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "customerDelete",
        onSubmit: this.handleDelete
      }, "Serial No.: ", /*#__PURE__*/React.createElement("input", {
        type: "number",
        name: "id",
        placeholer: "Enter serial no."
      }), /*#__PURE__*/React.createElement("span", null, " "), /*#__PURE__*/React.createElement("button", {
        id: "delBtn"
      }, "Delete"));
    }
  }]);

  return CustomerDelete;
}(React.Component);

var CustomerPage = /*#__PURE__*/function (_React$Component4) {
  _inherits(CustomerPage, _React$Component4);

  var _super4 = _createSuper(CustomerPage);

  function CustomerPage() {
    _classCallCheck(this, CustomerPage);

    return _super4.apply(this, arguments);
  }

  _createClass(CustomerPage, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "CustomerPage"
      }, /*#__PURE__*/React.createElement("h1", null, "Hotel California Wait List"), /*#__PURE__*/React.createElement(FreeSlots, {
        cnt: this.props.customers.length,
        showFreeSlots: this.props.showFreeSlots,
        changeShowFreeSlots: this.props.changeShowFreeSlots
      }), /*#__PURE__*/React.createElement(CustomerAdd, {
        createCustomer: this.props.createCustomer
      }), /*#__PURE__*/React.createElement(CustomerDelete, {
        deleteCustomer: this.props.deleteCustomer
      }), /*#__PURE__*/React.createElement(CustomerTable, {
        customers: this.props.customers
      }));
    }
  }]);

  return CustomerPage;
}(React.Component);

var WaitList = /*#__PURE__*/function (_React$Component5) {
  _inherits(WaitList, _React$Component5);

  var _super5 = _createSuper(WaitList);

  function WaitList() {
    var _this3;

    _classCallCheck(this, WaitList);

    _this3 = _super5.call(this);

    _defineProperty(_assertThisInitialized(_this3), "changeShowCustomer", function () {
      _this3.setState({
        showCustomer: !_this3.state.showCustomer
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "changeShowFreeSlots", function () {
      _this3.setState({
        showFreeSlots: !_this3.state.showFreeSlots
      });
    });

    _this3.state = {
      customers: [],
      showCustomer: false,
      showFreeSlots: true
    };
    _this3.createCustomer = _this3.createCustomer.bind(_assertThisInitialized(_this3));
    _this3.deleteCustomer = _this3.deleteCustomer.bind(_assertThisInitialized(_this3));
    _this3.changeShowFreeSlots = _this3.changeShowFreeSlots.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(WaitList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, response, body, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n      customerList {\n        id\n        name\n        phone\n        timestamp\n      }\n    }";
                _context.next = 3;
                return fetch('/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query
                  })
                });

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.text();

              case 6:
                body = _context.sent;
                result = JSON.parse(body, jsonDateReviver);
                this.setState({
                  customers: result.data.customerList
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "createCustomer",
    value: function () {
      var _createCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(customer) {
        var query, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "mutation {\n      customerAdd(customer:{\n        name: \"".concat(customer.name, "\"\n        phone: \"").concat(customer.phone, "\"\n      }) {\n        id\n        timestamp\n      }\n    }");
                _context2.next = 3;
                return fetch('/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query
                  })
                });

              case 3:
                response = _context2.sent;
                1;
                this.loadData();

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createCustomer(_x) {
        return _createCustomer.apply(this, arguments);
      }

      return createCustomer;
    }()
  }, {
    key: "deleteCustomer",
    value: function () {
      var _deleteCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var query, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "mutation {\n      customerDelete(id:".concat(id, ")\n    }");
                _context3.next = 3;
                return fetch('/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query
                  })
                });

              case 3:
                response = _context3.sent;
                this.loadData();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteCustomer(_x2) {
        return _deleteCustomer.apply(this, arguments);
      }

      return deleteCustomer;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "WaitList"
      }, /*#__PURE__*/React.createElement("hr", null), this.state.showCustomer ? /*#__PURE__*/React.createElement(CustomerPage, {
        showFreeSlots: this.state.showFreeSlots,
        changeShowFreeSlots: this.changeShowFreeSlots,
        createCustomer: this.createCustomer,
        deleteCustomer: this.deleteCustomer,
        customers: this.state.customers
      }) : /*#__PURE__*/React.createElement(HomePage, {
        showFreeSlots: this.state.showFreeSlots,
        changeShowFreeSlots: this.changeShowFreeSlots,
        cnt: this.state.customers.length
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("input", {
        id: "ShowCustomer",
        type: "submit",
        value: this.state.showCustomer ? "Home" : "Show Customers",
        onClick: this.changeShowCustomer
      }));
    }
  }]);

  return WaitList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(WaitList, null);
ReactDOM.render(element, document.getElementById('contents'));