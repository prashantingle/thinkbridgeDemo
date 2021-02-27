USE [thinkbridge]
GO

/****** Object:  Table [dbo].[Product]    Script Date: 27-02-2021 10:02:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Product](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[price] [decimal](18, 0) NULL,
	[description] [nvarchar](200) NOT NULL,
	[imageId] [uniqueidentifier] NULL,
	[DateAdded] [datetime] NOT NULL,
	[DateModified] [datetime] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


