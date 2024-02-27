export const run = (pdfText: string, header: any) => {
  return (
    `
    <!doctype html>
    <html lang="en">
    
        <head>
            
            <meta charset="utf-8" />
            <title>Responsive | Minible - Admin & Dashboard Template</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
            <meta content="Themesbrand" name="author" />
            <!-- App favicon -->
            <link rel="shortcut icon" href="assets/images/favicon.ico">
    
            <!-- Responsive Table css -->
            <link href="assets/libs/admin-resources/rwd-table/rwd-table.min.css" rel="stylesheet" type="text/css" />
    
            <!-- Bootstrap Css -->
            <link href="assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
            <!-- Icons Css -->
            <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
            <!-- App Css-->
            <link href="assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />

            <style>
            h5 {text-align: center;}

    .table td, .table th {
        font-size: 10px;
    }

    table, td, th {
        border: 1px solid black;
        font-size: 8px;

      }
      
      table {
        width: 100%;
        table-layout:fixed;
        border-collapse: collapse;
      }

      th.name {
        width: 12%
      }
      th.position {
        width: 10%
      }
      th.sex, th.ms{
        width: 5%
      }
       th.age {
        width: 5%
      }
     th.phone {
        width: 9%
      }
      th.address {
        width: 15%
      }
     th.email {
        width: 10%
      }
      th.bo, th.bd, th.co, th.ss {
        width: 5%
      }
     
      th.ref,th.ql,th.exp {
        width: 25%;
      }
      .tdbreak {
        word-break: break-all
      }
</style>
    
        </head>
    
        
        <body>
    
        <!-- <body data-layout="horizontal" data-topbar="colored"> -->
    
            <!-- Begin page -->
            <div id="layout-wrapper">
    
                
               
    
                
    
                <!-- ============================================================== -->
                <!-- Start right Content here -->
                <!-- ============================================================== -->
                <div className="main-content">
    
                    <div className="page-content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                        <div className="col-12">
                                        <h5 style="margin-left: auto;
                                        margin-right: auto;">THE WAEC EXAMINATIONS COUNCIL, ACCRA OFFICE</h5>
                                            <h5 className="card-title text-center">${header}</h5>
                                        </div>
                                            <div className="table-rep-plugin">
                                                <div className="table-responsive mb-0" data-pattern="priority-columns">
                                                <table style="width: 100%">
       
                                                <thead>
                                                  <tr>
                                                    <th className="name">Name</th>
                                                   
                                                    <th className="sex">Sex</th>
                                                    <th className="age">Age</th>
                                                    <th className="ms">Marital status</th>
                                                    <th className="ql">Qualification with dates</th>
                                                    <th className="exp">Experience with dates</th>
                                                    <th className="ref">References</th> 

                                                  </tr>
                                                </thead>
                                          
                                                <tbody>` +
                                                pdfText +
                                                ` </tbody>
                                               </table>
                                                </div>
            
                                            </div>
            
                                        </div>
                                    </div>
                                </div> <!-- end col -->
                            </div> <!-- end row -->
                        </div> <!-- container-fluid -->
                    </div>
                    <!-- End Page-content -->
    
                    
                 
                </div>
                <!-- end main content-->
    
            </div>
            <!-- END layout-wrapper -->
    
            
    
            <!-- Right bar overlay-->
            <div className="rightbar-overlay"></div>
    
            <!-- JAVASCRIPT -->
            <script src="assets/libs/jquery/jquery.min.js"></script>
            <script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="assets/libs/metismenu/metisMenu.min.js"></script>
            <script src="assets/libs/simplebar/simplebar.min.js"></script>
            <script src="assets/libs/node-waves/waves.min.js"></script>
            <script src="assets/libs/waypoints/lib/jquery.waypoints.min.js"></script>
            <script src="assets/libs/jquery.counterup/jquery.counterup.min.js"></script>
    
            <!-- Responsive Table js -->
            <script src="assets/libs/admin-resources/rwd-table/rwd-table.min.js"></script>
    
            <!-- Init js -->
            <script src="assets/js/pages/table-responsive.init.js"></script>
    
            <!-- App js -->
            <script src="assets/js/app.js"></script>
    
        </body>
    </html>
    
      `
  );
};
