using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting.Internal;
using ThinkBridgeBackEnd.Model;

namespace ThinkBridgeBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly thinkbridgeContext _context;
        private readonly IConfiguration _config;
        private string _path;
        public ProductsController(thinkbridgeContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
            _path =   _config.GetValue<string>("FilePath:images");  
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            var productDto = new ProductDTO()
            {
                name = product.Name,
                description = product.Description,
                price = product.Price

            };
            if (product.ImageId != null)
            {
                productDto.image = System.IO.File.ReadAllText(_path + product.ImageId); 
            }
            return productDto;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct([Bind("id,name, price, description,image")] ProductDTO prod)
        {

            var product = await _context.Products.FindAsync(prod.id);



            product.Description = prod.description;
            product.Name = prod.name;
            product.Price = prod.price;
            product.DateModified = DateTime.Now;
            
            if (!string.IsNullOrEmpty(prod.image))
            {
                product.ImageId = Guid.NewGuid();
                System.IO.File.WriteAllText(_path + product.ImageId , prod.image);
            }




            _context.Entry(product).State = EntityState.Modified;

            try
            {
                  _context.SaveChangesAsync();
            }
           
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ProductExists(product.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {

            }

            return NoContent();
        }



        // POST: api/Products
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]

        public async Task<ActionResult<Product>> PostProduct([Bind("name, price, description,image")] ProductDTO prod)
        {
            var product = new Product()
            {
                DateAdded = DateTime.Now,
                Description = prod.description,
                Name = prod.name,
                Price = prod.price
            };
            if (!string.IsNullOrEmpty(prod.image))
            {
                product.ImageId = Guid.NewGuid();
                System.IO.File.WriteAllText(_path + product.ImageId, prod.image);
            }

            _context.Products.Add(product);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
