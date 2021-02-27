using System;
using System.Collections.Generic;

#nullable disable

namespace ThinkBridgeBackEnd.Model
{
    public partial class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public Guid? ImageId { get; set; }
        public DateTime? DateAdded { get; set; }
        public DateTime? DateModified { get; set; }
    }
}
