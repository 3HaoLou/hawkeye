import _ from 'lodash';
import HttpService from '../services/http';
import URL from '../constants/url';

export function RoomList() {
    return HttpService.get(URL.ROOM_LIST);
}

export function RoomDetail(roomId) {
    let params = {
        roomId: roomId
    };

    return HttpService.get(URL.ROOM_DETAIL, params).then(
        (data) => {
            return convertRoomDetail(data);
        }
    );
}

function convertRoomDetail(data) {
    console.log(data);

    if (data.iqsRoom) {
        let tagList = data.iqsRoom.tagList;
        let itemList = data.iqsRoom.itemList;
        data.iqsRoom.projectList = [];

        _.forEach(tagList, (tag) => {
            let tmp = {
                roomId: data.iqsRoom.id,
                roomName: data.iqsRoom.name,
                roomType: data.iqsRoom.type,
                tag: tag,
                isCollapse: false,
                checked: false,
                items: [],
            };

            _.forEach(itemList, (item) => {
                if (tag === item.tag) {
                    let itemCount = 0;

                    if (item.constructionItem) {
                        itemCount = item.constructionItem.relationItemList.length + item.constructionItem.relationMaterialList.length;
                    } else if (item.mainMaterial) {
                        itemCount = item.mainMaterial.relationItemList.length + item.mainMaterial.relationMaterialList.length;
                    }

                    tmp.items.push({
                        roomId: data.iqsRoom.id,
                        roomName: data.iqsRoom.name,
                        roomType: data.iqsRoom.type,
                        tag: item.tag,
                        checked: false,
                        constructionItem: item.constructionItem,
                        mainMaterial: item.mainMaterial,
                        relationItemCount: itemCount + '项'
                    });
                }
            })

            data.iqsRoom.projectList.push(tmp);
        })
    }

    return data;
}
