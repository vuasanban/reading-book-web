from os import access
from pydantic import BaseModel

from database import Base


class BookInfoBase(BaseModel):
    image: str
    title: str
    bookType: str
    author: str
    descriptions: str
    viewCount: int
    content: str


class BookCreate(BookInfoBase):
    pass


class BookInfo(BookInfoBase):
    id: int

    class Config:
        orm_mode = True


class UserInfoBase(BaseModel):
    username: str
    userRole: str
    fullname: str


class UserCreate(UserInfoBase):
    password: str


class UserInfo(UserInfoBase):
    id: int

    class Config:
        orm_mode = True


class UserAuthenticate(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserBookCrossPrefInfoBase(BaseModel):
    idUser: int
    idBook: int


class UserBookCrossPrefCreate(UserBookCrossPrefInfoBase):
    pass


class UserBookCrossPrefInfo(UserBookCrossPrefInfoBase):
    id: int

    class Config:
        orm_mode = True
