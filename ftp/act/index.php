<!DOCTYPE html>
<html>
<head>
  <title>Truedice ZBot Manager</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/bootstrap-table.min.css">
  <link rel="stylesheet" type="text/css" href="style.css?v=1">
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>

<body>

  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span> <span class="icon-bar"></span>
          <span class="icon-bar"></span> 
        </button>
        <a class="navbar-brand" href="#"><span style="color: red">Truedice ZBot</span><span style="color: #5cb85c"> Manager</span></a>
        
        <input style="height: 40px;" type="text"  id="account-id-input" placeholder="Truedice ID">
        <input style="height: 40px;" type="text"  id="fb-addr-input" placeholder="FB/Messenger Address">
        <button type="button" id="activate-btn" style="height: 40px;">
          <span style="color: red">Activate</span>
        </button>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li class="active"><a style="color: red" href="#" onclick="window.load(); return true;">Reload</a></li>
          <li><a href="https://m.me/zickieloox" target="_blank">Contact Zic</a></li>
        </ul>
      </div>
    </div>
  </nav>
  
  <!-- Modals -->
  <div aria-hidden="true" aria-labelledby="delete-modal-label" class="modal fade" id="confirm-modal" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button aria-hidden="true" class="close" data-dismiss="modal" type="button">
              ×
            </button>
            <h4 class="modal-title" id="delete-modal-label">
              <span class="glyphicon glyphicon-remove" style="color: red">
              </span>
              Confirm Delete - <span class="cur-account-id"></span>
            </h4>
          </div>
          <div class="modal-body">
            <p>
              Are you sure?
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-default" data-dismiss="modal" type="button">
              Cancel
            </button>
            <button class="btn btn-danger" id="btn-delete" type="button">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

  <div class="modal fade" id="edit-modal" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header" style="padding:35px 50px;">
            <button class="close" data-dismiss="modal" type="button">
              ×
            </button>
            <h4>
              <span class="glyphicon glyphicon-edit">
              </span>
              Edit - <span class="cur-account-id"></span>
            </h4>
          </div>
          <div class="modal-body" style="padding:40px 50px;">
            <form data-parsley-validate="" id="edit-key-form" role="form">
              <div class="form-group">
                <label for="edit-key-value">
                  <span class="glyphicon glyphicon-user">
                  </span>
                  Truedice ID
                </label>
                <input class="form-control" data-parsley-length="[17, 18]" id="edit-key-value" placeholder="Truedice ID" required="" type="text">
                </input>
              </div>
              <div class="form-group">
                <label for="edit-note">
                  <span class="glyphicon glyphicon-list-alt">
                  </span>
                  Facebook/Messenger Address
                </label>
                <input class="form-control" data-parsley-maxlength="60" data-parsley-trigger="change" id="edit-note" placeholder="FB/Messenger Address" type="text">
                </input>
              </div>
              <button class="btn btn-success btn-block" type="submit">
                <span class="glyphicon glyphicon-edit">
                </span>
                Edit
              </button>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger btn-default pull-left" data-dismiss="modal" type="submit">
              <span class="glyphicon glyphicon-remove">
              </span>
              Cancel
            </button>
            <p>
              Cannot edit?
              <a href="https://m.me/zickieloox">
                Help
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

  <div class="container my-container no-border">
    <div class='row'>
      <div class='col-md-12'>
        <table id="table">
          <thead>
            <tr>
              <th data-field="accountId">Truedice ID</th>
              <th data-field="fbAddr">Facebook Address</th>
              <th data-field="lastModified">Last Modified</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/bootstrap-table.min.js"></script>
  <script src="script.js?v=2"></script>
</body>

</html>