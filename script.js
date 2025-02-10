$(document).ready(function () {
  // Initial list of customers
  let customers = ['John Doe', 'Jane Smith', 'Michael Brown'];

  // Function to render the customer list
  function renderCustomerList() {
    $('.customer-list').empty();
    customers.forEach((customer) => {
      $('.customer-list').append(`
        <li class="bg-[#202020] p-3 rounded-md text-white hover:bg-[#272727] flex gap-2 items-center relative border-l-4 border-transparent focus-within:border-yellow-600 active:border-yellow-600 outline-none">
          <span class="flex-1">${customer}</span>
          <button id="editCustomer" class="mr-2"><img src="/assets/dots.svg" alt=""></button>
        </li>`);
    });
  }

  // Handle the edit and delete buttons
  $(document).on('click', '#editCustomer', function () {
    const $li = $(this).closest('li');
    const $editDeleteDiv = $(`
        <div class="flex w-28 flex-col mt-2 absolute right-0 bg-[#2c2c2c] z-20 rounded-md shadow-md">
            <button class="edit-btn text-white p-2 rounded hover:bg-[#272727]">Edit</button>
            <button class="delete-btn  text-white p-2 rounded hover:bg-[#272727]">Delete</button>
        </div>
    `);
    $li.append($editDeleteDiv);

    // Remove the div if click outside
    $(document).on('click', function (event) {
      if (
        !$(event.target).closest($li).length &&
        !$(event.target).is('#editCustomer')
      ) {
        $editDeleteDiv.remove();
      }
    });

    // Remove the div if it already exists
    if ($li.find('.flex').length > 1) {
      $li.find('.flex').first().remove();
    }
  });

  // Handle the delete button click
  $(document).on('click', '.delete-btn', function () {
    const $li = $(this).closest('li');
    const customerName = $li.find('span').text();
    customers = customers.filter((customer) => customer !== customerName);
    renderCustomerList();
  });

  // Handle the edit button click
  $(document).on('click', '.edit-btn', function () {
    const $li = $(this).closest('li');
    const customerName = $li.find('span').text();
    $('#customerName').val(customerName);
    $('#customerDialog')[0].showModal();

    // Remove the customer from the list temporarily
    customers = customers.filter((customer) => customer !== customerName);

    // When the form is submitted, update the customer list
    $('#customerForm')
      .off('submit')
      .on('submit', function (event) {
        event.preventDefault();
        let newCustomerName = $('#customerName').val();
        customers.push(newCustomerName);
        renderCustomerList();
        $('#customerDialog')[0].close();
        $('#customerForm')[0].reset();
      });
  });

  // Show the customer dialog when the "Add Customer" button is clicked
  $('#addCustomer').click(function (event) {
    event.preventDefault();
    setTimeout(function () {
      $('#customerDialog')[0].showModal();
    }, 500);
  });

  // Close the customer dialog when the "Cancel" button is clicked
  $('#closeDialog').click(function () {
    $('#customerDialog')[0].close();
  });

  // Handle the form submission
  $('#customerForm').submit(function (event) {
    event.preventDefault();

    // Validate all required fields
    let isValid = true;
    $('#customerForm input[required], #customerForm select[required]').each(
      function () {
        if ($(this).val() === '') {
          isValid = false;
          $(this).addClass('border-red-500');
        } else {
          $(this).removeClass('border-red-500');
        }
      }
    );

    // If all required fields are filled, add the customer
    if (isValid) {
      let customerName = $('#customerName').val();
      customers.push(customerName);
      renderCustomerList();
      setTimeout(function () {
        $('#customerDialog')[0].close();
      }, 500);
      $('#customerForm')[0].reset();
    } else {
      alert('Please fill in all required fields.');
    }
  });

  // Initial render of the customer list
  renderCustomerList();
});

$(document).ready(function () {
  const projects = ['Project 1', 'Project 2', 'Project 3', 'Project 4'];

  function renderProjectList() {
    $('.projects').sortable();
    $('.projects').empty();
    projects.forEach((project) => {
      $('.projects').append(
        `<li class="bg-[#181818] text-white rounded-lg hover:bg-[#272727]  shadow cursor-pointer">
        <h3 class="p-4">${project}</h3>
     <div class="p-4">
                  <p>Cras dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean lacinia mauris vel est. </p><p>Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
                </div>
                </li>`
      );
    });
    $('#accordion').accordion({ collapsible: true, active: false });
  }

  renderProjectList(); // Initial render
});
