import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { AppColors, AppImages, normalized } from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';
import CommonModal from './CommonModal';
import { useSelector } from 'react-redux';
import { AppRootStore } from '../../../Redux/store/AppStore';
import LoadingImage from '../LoadingImage/LoadingImage';

interface Props {
    onClose: () => void;
    listType: 'children' | 'school';
    selectedItem: any;
    setSelectedItem: (item: any) => void;
}

const HeaderListModal = (props: Props) => {
    const { childList } = useSelector((state: AppRootStore) => state.AppReducer)
    const isSchool = props.listType == 'school';
    return <CommonModal
        onClose={props.onClose}
        isArrowShown={true}
    >
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.selectSchoolTitle}>{`Select ${isSchool ? 'School' : 'Child'}`}</Text>
            {
                childList.length > 0 ?
                    childList.map((item: any, index: any) => {
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => {
                                props.setSelectedItem(item);
                                props.onClose();
                            }}>
                                <View style={styles.singleRowContainer}>
                                    <View style={styles.schoolImgBox}>
                                        {
                                            isSchool ?
                                                <Image
                                                    source={AppImages.Common.schoolIcon}
                                                    resizeMode='contain'
                                                    style={styles.schoolImg} /> :
                                                item?.image ?
                                                    <LoadingImage
                                                        src={{ uri: item.image }}
                                                        containerStyle={AppStyles.fullHeightAndWidth}
                                                        imageStyle={AppStyles.fullHeightAndWidth}
                                                        resizeMode='cover'
                                                    /> :
                                                    <Image
                                                        source={AppImages.Common.PersonPlaceholder}
                                                        resizeMode='contain'
                                                        style={styles.placeholderImg} />
                                        }
                                    </View>
                                    <View style={[styles.singleContentBox, isSchool && { marginLeft: normalized(7) }]}>
                                        {
                                            !isSchool &&
                                            <Text style={styles.singleTitle}>{item.fullName}</Text>
                                        }
                                        <Text style={[styles.singleLabel, isSchool && {
                                            ...AppStyles.textSemiBold,
                                            fontSize: normalized(14)
                                        }]}>{item.school.schoolName}</Text>
                                    </View>
                                    <View style={styles.outerCheckBox}>
                                        {
                                            item.id == props.selectedItem.id &&
                                            <View style={styles.innerCheckBox} />
                                        }
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                    :
                    <View style={styles.noRecBox}>
                        <Text style={styles.noRecTxt}>No Child record found </Text>
                    </View>
            }
        </ScrollView>
    </CommonModal>
}

export default HeaderListModal;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: AppColors.transparentColorLight,
        justifyContent: 'flex-end'
    },
    transparentBg: {
        ...StyleSheet.absoluteFillObject,
    },
    singleRowContainer: {
        minHeight: 60,
        ...AppStyles.horiCommon,
        paddingHorizontal: normalized(20),
        marginVertical: 5,
        paddingVertical: normalized(15),
    },
    singleContentBox: {
        flex: 1,
        paddingHorizontal: normalized(10),
        marginLeft: normalized(10),
    },
    singleTitle: {
        ...AppStyles.textSemiBold,
        color: AppColors.black.black,
        fontSize: normalized(14),
    },
    singleLabel: {
        ...AppStyles.textRegular,
        color: AppColors.black.black,
        fontSize: normalized(12),
        marginTop: 5
    },
    outerCheckBox: {
        height: normalized(25),
        width: normalized(25),
        borderRadius: normalized(15),
        borderWidth: 2,
        borderColor: AppColors.blue.mainBlue,
        ...AppStyles.centeredCommon
    },
    innerCheckBox: {
        height: normalized(12),
        width: normalized(12),
        borderRadius: normalized(6),
        backgroundColor: AppColors.blue.mainBlue
    },
    noRecBox: {
        minHeight: 100,
        ...AppStyles.centeredCommon
    },
    noRecTxt: {
        ...AppStyles.textBold,
        fontSize: normalized(14),
        color: AppColors.black.black,
        textAlign: 'center',
    },
    selectSchoolTitle: {
        ...AppStyles.textBold,
        color: AppColors.black.black,
        fontSize: normalized(16),
        marginHorizontal: normalized(20),
    },
    schoolImgBox: {
        backgroundColor: AppColors.blue.lighterBlue,
        height: normalized(45),
        width: normalized(45),
        borderRadius: normalized(15),
        ...AppStyles.centeredCommon,
        marginLeft: normalized(10),
        overflow: 'hidden'
    },
    schoolImg: {
        height: '40%',
        width: '40%'
    },
    placeholderImg: {
        height: '70%',
        width: '70%',
        tintColor: AppColors.black.lighter
    }
})