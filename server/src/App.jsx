const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function FreeSlots(props) {
  return (
    <div>
      {props.showFreeSlots ? <span id="cnt">{25 - props.cnt}/25 free slots </span> : null}
      <input id="ShowFreeSlots" type="submit" value={props.showFreeSlots ? "Hide": "Show #Free Slots"} onClick={props.changeShowFreeSlots} />
    </div>
  );
}

class HomePage extends React.Component {
  render() {
    return (
      <div id="HomePage">
        <img src="hc_2.jpg" alt="https://cdn.dribbble.com/users/165280/screenshots/3717720/attachments/833673/hc_2.jpg" width='50%'/>
        <h1>Hotel California Wait List</h1>
        <FreeSlots cnt={this.props.cnt} showFreeSlots={this.props.showFreeSlots} changeShowFreeSlots={this.props.changeShowFreeSlots}/>
      </div>
    );
  }
}

function CustomerRow(props) {
  const customer = props.customer;
  return (
    <tr>
      <td>{customer.id}</td>
      <td>{customer.name}</td>
      <td>{customer.phone}</td>
      <td>{customer.timestamp.toDateString()}</td>
    </tr>
  );
}

function CustomerTable(props) {
  const customerRows = props.customers.map(customer =>
    <CustomerRow key={customer.id} customer={customer} />
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Serial No.</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {customerRows}
      </tbody>
    </table>
  );
}

class CustomerAdd extends React.Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    const form = document.forms.customerAdd;
    const customer = {
      name: form.name.value, phone: form.phone.value,
    }
    this.props.createCustomer(customer);
    form.name.value = ""; form.phone.value = "";
  }

  render() {
    return (
      <form name="customerAdd" onSubmit={this.handleAdd}>
        Name: <input type="text" name="name" placeholer="Enter customer name"/><span> </span>
        Phone Number: <input type="text" name="phone" placeholer="Enter contact number"/><span> </span>
        <button id="addBtn">Add</button>
      </form>
    );
  }
}

class CustomerDelete extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    const form = document.forms.customerDelete;
    const id = Number(form.id.value);
    this.props.deleteCustomer(id);
    form.id.value = "";
  }

  render() {
    return (
      <form name="customerDelete" onSubmit={this.handleDelete}>
        Serial No.: <input type="number" name="id" placeholer="Enter serial no."/><span> </span>
        <button id="delBtn">Delete</button>
      </form>
    );
  }
}

class CustomerPage extends React.Component {
  render() {
    return (
      <div id="CustomerPage">
        <h1>Hotel California Wait List</h1>
        <FreeSlots cnt={this.props.customers.length} showFreeSlots={this.props.showFreeSlots} changeShowFreeSlots={this.props.changeShowFreeSlots}/>
        <CustomerAdd createCustomer={this.props.createCustomer}/>
        <CustomerDelete deleteCustomer={this.props.deleteCustomer}/>
        <CustomerTable customers={this.props.customers} />
      </div>
    );
  }
}

class WaitList extends React.Component {
  constructor() {
    super();
    this.state = { customers: [], showCustomer: false, showFreeSlots: true };
    this.createCustomer = this.createCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.changeShowFreeSlots = this.changeShowFreeSlots.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      customerList {
        id
        name
        phone
        timestamp
      }
    }`;

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);
    this.setState({ customers: result.data.customerList });
  }

  async createCustomer(customer) {
    const query = `mutation {
      customerAdd(customer:{
        name: "${customer.name}"
        phone: "${customer.phone}"
      }) {
        id
        timestamp
      }
    }`;

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query })
    });1
    this.loadData();
  }

  async deleteCustomer(id) {
    const query = `mutation {
      customerDelete(id:${id})
    }`;

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query })
    });
    this.loadData();
  }

  changeShowCustomer = () => {
    this.setState({ showCustomer: !this.state.showCustomer });
  }

  changeShowFreeSlots = () => {
    this.setState({ showFreeSlots: !this.state.showFreeSlots });
  }

  render() {
    return (
      <div id="WaitList">
          <hr />
          { this.state.showCustomer ? 
            <CustomerPage showFreeSlots={this.state.showFreeSlots} changeShowFreeSlots={this.changeShowFreeSlots} createCustomer={this.createCustomer} deleteCustomer={this.deleteCustomer} customers={this.state.customers}/> : 
            <HomePage showFreeSlots={this.state.showFreeSlots} changeShowFreeSlots={this.changeShowFreeSlots} cnt={this.state.customers.length} /> 
          }
          <hr />
          <input id="ShowCustomer" type="submit" value={this.state.showCustomer ? "Home": "Show Customers"} onClick={this.changeShowCustomer} />
      </div>
    );
  }
}

const element = <WaitList />;

ReactDOM.render(element, document.getElementById('contents'));
