using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ThinkBridgeBackEnd.Model
{
    public class ProductDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public decimal price { get; set; }
        public string description { get; set; }
        public string image { get; set; }
    }
}
