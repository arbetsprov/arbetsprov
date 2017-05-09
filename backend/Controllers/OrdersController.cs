using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using backend;
using System.Text;
using System.ComponentModel;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        
        public OrdersController() : base(){
            Console.WriteLine("Anrop till Orders");
        }
        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            
            string urlRows = "https://winserv.wssoftware.se/files/files/public/img/uppgift/orderrader.txt";
            string urlHeaders = "https://winserv.wssoftware.se/files/files/public/img/uppgift/orderhuvuden.txt";
            HttpClient client = new HttpClient();
            
            var responseRows = await client.GetStringAsync(urlRows);
            var responseHeaders = await client.GetStringAsync(urlHeaders);
                        
            responseHeaders.TrimStart(Encoding.Unicode.GetPreamble().ToString().ToCharArray());
            responseRows.TrimStart(Encoding.Unicode.GetPreamble().ToString().ToCharArray());
            
            var serializerH = new DataContractJsonSerializer(typeof(List<Header>));
            var serializerR = new DataContractJsonSerializer(typeof(List<Rows>));
            List<Header> headers = serializerH.ReadObject(new MemoryStream( Encoding.UTF8.GetBytes(responseHeaders) )) as List<Header>;
            List<Rows> rows = serializerR.ReadObject(new MemoryStream(Encoding.UTF8.GetBytes(responseRows))) as List<Rows>;

            headers.ForEach(head =>
            {
                rows.ForEach(row =>
                {
                    if (row.ordernummer == head.ordernummer)
                    {                        
                        head.rows.Add(row);
                    }
                });
            });                       
            return new ObjectResult(headers);
        }


        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //   return "value";
        //}

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
