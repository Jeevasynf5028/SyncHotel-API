var builder=WebApplication.CreateBuilder(args);//create web applicatoiin built
builder.Services.AddEndpointsApiExplorer();//for exploring api from external client
builder.Services.AddSwaggerGen();//for testing api form UI
builder.Services.AddControllers();// for adding controllers for back and procssing in applications

var app=builder.Build();//build application

//configure the Http request

if(app.Environment.IsDevelopment()){
    app.UseDeveloperExceptionPage();//for showing exception page in browser
    app.UseSwagger();//promoting t use swagger
    app.UseSwaggerUI();//for showing the UI in browser
}
app.UseHttpsRedirection();//for redirection http to http request
app.UseAuthorization();//for authorization of user
app.MapControllers();//for mapping controller endpoints
app.UseRouting();//for routing of request
app.UseCors(policy=>policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());//for allowing oring 
app.MapGet("/",()=>"SYNCHOTEL");//index of applictoin
app.Run();//run application