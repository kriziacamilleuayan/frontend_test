"use client";

import { useState } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import Modal from "./modal";

import { Pokemon, Stats, User } from "./types/user";
import Image from "next/image";

export type GalleryProps = {
  users: User[] | Pokemon[];
};
const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState(users);
  const [selectedUser, setSelectedUser] = useState<User | Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (id: number | string) => {
    const user = usersList.find((item) => item.id === id) || null;

    if(user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="user-gallery">
      <h1 className="heading">Users</h1>
      <div className="items">
        {usersList.map((user, index) => (
          <div
            className="item user-card"
            key={index}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              {user.isPokemon ?  
              <Image src={user.image} alt={user.name} width={96} height={96} />
              : <Avatar
                size={96}
                name={user.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />}
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">
                {user.isPokemon ? user.types.join(', ') : user.company.name}
              </div>
            </div>
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    {selectedUser.isPokemon ?
                      <Image src={selectedUser.image} alt={selectedUser.name} width={240} height={240} />
                      : <Avatar
                          size={240}
                          name={selectedUser.name}
                          variant="marble"
                          colors={[
                            "#92A1C6",
                            "#146A7C",
                            "#F0AB3D",
                            "#C271B4",
                            "#C20D90",
                          ]}
                        />
                    }
                  </div>
                  {selectedUser.isPokemon ? 
                      <>
                        <div className="name">{selectedUser.name}</div>
                        <div className="field">
                          <div className="data"><b>Type:</b> {selectedUser.types.join(', ')}</div>
                        </div>
                        <div className="field">
                          <div className="data"><b>Weight:</b> {selectedUser.weight / 10} kg</div>
                        </div>
                        <div className="field">
                          <div className="data"><b>Height:</b> {selectedUser.height / 10} m</div>
                        </div>
                        <div className="field">
                          <div className="data"><b>Base Exp:</b> {selectedUser.baseExperience}</div>
                        </div>
                        {selectedUser.stats
                          .map((stat: Stats) => <div key={stat.name}><b>{stat.name}:</b> {stat.value}</div>)
                        }
                      </>
                    : <>
                        <div className="name">
                          {selectedUser.name} ({selectedUser.username})
                        </div>
                        <div className="field">
                          <FaLocationDot className="icon" />
                          <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                        </div>
                        <div className="field">
                          <FaPhone className="icon" />
                          <div className="value">{selectedUser.phone}</div>
                        </div>
                        <div className="fields">
                          <FaEnvelope className="icon" />
                          <div className="value">{selectedUser.email}</div>
                        </div>
                        <div className="company">
                          <div className="name">{selectedUser.company.name}</div>
                          <div className="catchphrase">
                            {selectedUser.company.catchPhrase}
                          </div>
                        </div>
                      </>
                    }
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
